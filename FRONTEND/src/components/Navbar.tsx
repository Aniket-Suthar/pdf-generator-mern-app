// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../output.css";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 mt-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white font-bold text-xl">PDFgen</Link>
                {/* Add navigation links here */}
                <ul className="flex space-x-4">
                    <li className="text-white"><Link to="/">Home</Link></li>
                    <li className="text-white"><Link to="/login">Login</Link></li>
                    <li className="text-white"><Link to="/register">Register</Link></li>
                    <li className="text-white"><Link to="/product">Add Product</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
