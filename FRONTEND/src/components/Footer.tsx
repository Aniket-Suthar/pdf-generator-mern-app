// components/Footer.tsx
import React from 'react';
import "../output.css"

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 p-4 mt-0">
            <div className="container mx-auto text-center text-white">
                By Aniket Suthar <br />
                &copy; 2024 Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
