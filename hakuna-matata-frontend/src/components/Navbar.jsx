// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-primary text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Hakuna Matata</h1>
                <ul className="flex space-x-8">
                    <li><Link to="/" className="hover:text-secondary">Inicio</Link></li>
                    <li><Link to="/products" className="hover:text-secondary">Productos</Link></li>
                    <li><Link to="/cart" className="hover:text-secondary">Carrito</Link></li>
                    <li><Link to="/login" className="hover:text-secondary">Ingresar</Link></li>
                    <li><Link to="/register" className="hover:text-secondary">Registrarse</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

