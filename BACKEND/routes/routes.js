const express = require('express');
const bcrypt = require('bcrypt');
const path = require("path")
const jwt = require('jsonwebtoken');
const fs = require('fs');
const PDFDocument = require('pdfkit');


const router = express.Router();


const User = require('../models/user');
const Product = require('../models/product');

// Registration route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Validating email using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    try {
        // Checking if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Creating new user and hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});



//Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log(password, user.password, isValidPassword)

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1h' });

        res.status(201).json({ message: 'User logged in successfully', token });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

//Product routes
let products = []; // Array to store products

// Add Product route
router.post('/add-product', async (req, res) => {
    const { name, qty, rate } = req.body;

    try {
        // Calculating product total
        const total = qty * rate;

        // Calculating GST
        const gst = total * 0.18;

        // const total = temptotal + gst;

        // Creating a new product instance
        const product = new Product({
            name,
            qty,
            rate,
            total,
            gst
        });

        // Save the product to the database
        await product.save();

        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to generate PDF invoice
// router.get('/generate-pdf', async (req, res) => {
//     try {
//         const companyLogo = path.join(__dirname, '/image.png'); // Replace with your logo path
//         const products = await Product.find();

//         const doc = new PDFDocument();
//         const fileName = `invoice_${Date.now()}.pdf`;
//         const filePath = path.join(__dirname, 'invoices', fileName);
//         doc.pipe(fs.createWriteStream(filePath));

//         // Add company logo and header
//         doc.fontSize(14).text('INVOICE GENERATOR', { align: 'center' }).moveDown();
//         if (fs.existsSync(companyLogo)) {
//             doc.image(companyLogo, { width: 100, height: 100, align: 'right' });
//         }

//         // Draw table for product details
//         const tableX = 50; // X position of the table
//         const tableY = 200; // Y position of the table
//         const columnWidth = 100; // Width of each column
//         const rowHeight = 20; // Height of each row
//         const headerRowY = tableY; // Y position of the header row
//         const headerRowX = tableX; // X position of the header row

//         // Draw header row
//         doc.font('Helvetica-Bold').fontSize(12);
//         doc.text('Product', headerRowX, headerRowY);
//         doc.text('Qty', headerRowX + columnWidth, headerRowY);
//         doc.text('Rate', headerRowX + 2 * columnWidth, headerRowY);
//         doc.text('Total', headerRowX + 3 * columnWidth, headerRowY);

//         // Draw table body
//         doc.font('Helvetica').fontSize(10);
//         let currentY = headerRowY + rowHeight;
//         products.forEach((product, index) => {
//             doc.text(product.name, headerRowX, currentY);
//             doc.text(product.qty.toString(), headerRowX + columnWidth, currentY);
//             doc.text(product.rate.toString(), headerRowX + 2 * columnWidth, currentY);
//             doc.text(product.total.toString(), headerRowX + 3 * columnWidth, currentY);
//             currentY += rowHeight;
//         });

//         // Draw lines to separate rows and columns
//         const tableWidth = 4 * columnWidth;
//         const tableHeight = (products.length + 1) * rowHeight;
//         doc.rect(tableX, tableY, tableWidth, tableHeight).stroke(); // Draw border around the table
//         for (let i = 1; i <= products.length; i++) {
//             doc.moveTo(tableX, tableY + i * rowHeight).lineTo(tableX + tableWidth, tableY + i * rowHeight).stroke(); // Horizontal lines
//         }
//         doc.moveTo(tableX + columnWidth, tableY).lineTo(tableX + columnWidth, tableY + tableHeight).stroke(); // Vertical lines
//         doc.moveTo(tableX + 2 * columnWidth, tableY).lineTo(tableX + 2 * columnWidth, tableY + tableHeight).stroke(); // Vertical lines
//         doc.moveTo(tableX + 3 * columnWidth, tableY).lineTo(tableX + 3 * columnWidth, tableY + tableHeight).stroke(); // Vertical lines

//         // Calculate totals
//         const total = products.reduce((acc, product) => acc + product.total, 0);
//         const gst = total * 0.18;
//         const grandTotal = total + gst;

//         // Add totals section
//         doc.fontSize(12).text(`Total: INR ${total.toFixed(2)}`, tableX, tableY + (products.length + 1) * rowHeight + 10, { align: 'left' });
//         doc.fontSize(12).text(`GST (18%): INR ${gst.toFixed(2)}`, tableX, tableY + (products.length + 1) * rowHeight + 30, { align: 'left' });
//         doc.fontSize(12).text(`Grand Total: INR ${grandTotal.toFixed(2)}`, tableX, tableY + (products.length + 1) * rowHeight + 50, { align: 'left' });

//         // Finalize the PDF
//         doc.end();

//         // Sending the generated PDF as a response
//         res.download(filePath, fileName, (err) => {
//             if (err) {
//                 console.error('Error downloading invoice:', err);
//                 res.status(500).json({ message: 'Error downloading invoice' });
//             } else {
//                 // Delete the file after downloading
//                 fs.unlinkSync(filePath);
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Ensure the invoices directory exists
// const invoicesDir = path.join(__dirname, 'invoices');
// if (!fs.existsSync(invoicesDir)) {
//     fs.mkdirSync(invoicesDir);
// }



router.get('/generate-pdf', async (req, res) => {
    try {
        const companyLogo = path.join(__dirname, '/image.png'); // Replace with your logo path
        const products = await Product.find();

        const doc = new PDFDocument();

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

        // Pipe the PDF document directly to the response
        doc.pipe(res);

        // Add company logo and header
        doc.fontSize(14).text('INVOICE GENERATOR', { align: 'center' }).moveDown();
        if (fs.existsSync(companyLogo)) {
            doc.image(companyLogo, { width: 100, height: 100, align: 'right' });
        }

        // Draw table for product details
        const tableX = 50; // X position of the table
        const tableY = 200; // Y position of the table
        const columnWidth = 100; // Width of each column
        const rowHeight = 20; // Height of each row
        const headerRowY = tableY; // Y position of the header row
        const headerRowX = tableX; // X position of the header row

        // Draw header row
        doc.font('Helvetica-Bold').fontSize(12);
        doc.text('Product', headerRowX, headerRowY);
        doc.text('Qty', headerRowX + columnWidth, headerRowY);
        doc.text('Rate', headerRowX + 2 * columnWidth, headerRowY);
        doc.text('Total', headerRowX + 3 * columnWidth, headerRowY);

        // Draw table body
        doc.font('Helvetica').fontSize(10);
        let currentY = headerRowY + rowHeight;
        products.forEach((product, index) => {
            doc.text(product.name, headerRowX, currentY);
            doc.text(product.qty.toString(), headerRowX + columnWidth, currentY);
            doc.text(product.rate.toString(), headerRowX + 2 * columnWidth, currentY);
            doc.text(product.total.toString(), headerRowX + 3 * columnWidth, currentY);
            currentY += rowHeight;
        });

        // Draw lines to separate rows and columns
        const tableWidth = 4 * columnWidth;
        const tableHeight = (products.length + 1) * rowHeight;
        doc.rect(tableX, tableY, tableWidth, tableHeight).stroke(); // Draw border around the table
        for (let i = 1; i <= products.length; i++) {
            doc.moveTo(tableX, tableY + i * rowHeight).lineTo(tableX + tableWidth, tableY + i * rowHeight).stroke(); // Horizontal lines
        }
        doc.moveTo(tableX + columnWidth, tableY).lineTo(tableX + columnWidth, tableY + tableHeight).stroke(); // Vertical lines
        doc.moveTo(tableX + 2 * columnWidth, tableY).lineTo(tableX + 2 * columnWidth, tableY + tableHeight).stroke(); // Vertical lines
        doc.moveTo(tableX + 3 * columnWidth, tableY).lineTo(tableX + 3 * columnWidth, tableY + tableHeight).stroke(); // Vertical lines

        // Calculate totals
        const total = products.reduce((acc, product) => acc + product.total, 0);
        const gst = total * 0.18;
        const grandTotal = total + gst;

        // Add totals section
        doc.fontSize(12).text(`Total: INR ${total.toFixed(2)}`, tableX, tableY + (products.length + 1) * rowHeight + 10, { align: 'left' });
        doc.fontSize(12).text(`GST (18%): INR ${gst.toFixed(2)}`, tableX, tableY + (products.length + 1) * rowHeight + 30, { align: 'left' });
        doc.fontSize(12).text(`Grand Total: INR ${grandTotal.toFixed(2)}`, tableX, tableY + (products.length + 1) * rowHeight + 50, { align: 'left' });

        // Finalize the PDF
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
