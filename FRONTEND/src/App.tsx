// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import AddProduct from './components/AddProduct';
import Home from './components/Home';
// import Navbar from './components/Navbar'; // Import your Navbar component

const App: React.FC = () => {
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
