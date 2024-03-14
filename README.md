# PDF Generator Web App

This is a web application for generating PDF invoices. It allows users to register, login, add products, and generate invoices.

## Features

- **User Authentication**: Users can register, login, and logout.
- **Add Products**: Users can add products with their details such as name, quantity, and rate.
- **Generate PDF Invoice**: Users can generate PDF invoices containing the details of the products added.

## Technologies Used

- **Frontend**: React.js with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express.js, MongoDB for database
- **PDF Generation**: pdfkit library
- **Authentication**: JWT (JSON Web Tokens)
- **Routing**: react-router-dom

## Installation

1. Clone the repository:

 
   git clone [https://github.com/your-username/pdf-generator-web-app.git](https://github.com/Aniket-Suthar/pdf-generator-mern-app)

## Running Project
```bash
cd pdf-generator-web-app
cd frontend
npm install
cd ..
cd backend
npm install
```

## Set Up Environment
MONGODB_URI=your_mongo_db_uri

## Running the Development Server

# Run backend server
``` bash

cd ./backend
npm run start
```
# Run frontend server
``` bash
cd ../frontend
npm run dev
```


## Usage

### Registration:

- Click on the "Register" link in the navigation bar.
- Fill in the registration form with your name, email, and password.
- Click the "Register" button to create an account.

### Login:

- Click on the "Login" link in the navigation bar.
- Enter your registered email and password.
- Click the "Login" button to log in to your account.

### Adding Products:

- Once logged in, navigate to the "Add Product" page.
- Fill in the product details (name, quantity, rate) in the form.
- Click the "Add Product" button to add the product.

### Generating PDF Invoice:

- After adding products, you can generate a PDF invoice.
- Click on the "Generate Invoice" button to download the PDF invoice.




