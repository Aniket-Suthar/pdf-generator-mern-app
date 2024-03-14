import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';

const AddProduct: React.FC = () => {
    const [productData, setProductData] = useState({
        name: '',
        qty: '',
        rate: '',
    });
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddProduct = () => {
        setProducts([...products, productData]);
        setProductData({ name: '', qty: '', rate: '' });
        setSuccessMessage('Product added successfully');
        setTimeout(() => {
            setSuccessMessage('');
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/add-product', productData);
            handleAddProduct();
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error
        }
    };

    const handleGenerateInvoice = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/generate-pdf', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();
            setSuccessMessage('Invoice downloaded successfully');
        } catch (error) {
            console.error('Error generating invoice:', error);
            // Handle error
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center bg-gray-50 py-10 px-2 sm:px-6 lg:px-5">
                <div className="max-w-md w-full space-y-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Add Product</h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">Product Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleChange}
                                    autoComplete="off"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Product Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="qty" className="sr-only">Quantity:</label>
                                <input
                                    type="number"
                                    id="qty"
                                    name="qty"
                                    value={productData.qty}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Quantity"
                                />
                            </div>
                            <div>
                                <label htmlFor="rate" className="sr-only">Rate:</label>
                                <input
                                    type="number"
                                    id="rate"
                                    name="rate"
                                    value={productData.rate}
                                    onChange={handleChange}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Rate"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>


                    <div className="mt-4">
                        <button
                            onClick={handleGenerateInvoice}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={loading}
                        >
                            {loading ? 'Generating Invoice...' : 'Generate Invoice'}
                        </button>
                    </div>

                    {<p className="text-green-600">{successMessage}</p>}
                </div>

                <table className="mt-8 w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Product Name</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.qty}</td>
                                <td className="border px-4 py-2">{product.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default AddProduct;
