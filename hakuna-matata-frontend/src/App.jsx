// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = "Hakuna Matata";
        const favicon = document.querySelector("link[rel='icon']");
        favicon.href = `https://seeklogo.com/images/H/hakuna-matata-logo-F63CA4BDCF-seeklogo.com.png`; 
    }, []);

    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-200 text-dark">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;