import React from 'react';
import backgroundImage from '../assets/bgimage.png'; // Import your background image
import "../output.css";

const Hero: React.FC = () => {
    return (
        <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url(${backgroundImage})`, backgroundColor: 'rgba(1, 2, 3, 0.9)' }}>
            <div className="text-center text-green">
                <h1 className="text-5xl font-bold mb-4">PDF Generator</h1>
                <p className="text-xl">Discover the best invoice generator</p>
            </div>
        </div>
    );
};

export default Hero;
