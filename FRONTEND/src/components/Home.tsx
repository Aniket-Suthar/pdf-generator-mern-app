// components/Home.tsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Hero from './Hero';
import "../output.css"

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Footer />
        </div>
    );
};

export default Home;
