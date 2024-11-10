// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cart, setCart] = useState([]);
    const userId = localStorage.getItem('userId'); // Asumiendo que el ID del usuario está almacenado en el localStorage

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/api/cart/${userId}`) // Obtener productos del carrito con el ID del usuario
                .then(response => {
                    setCart(response.data); // Asumiendo que la respuesta es un array de productos
                })
                .catch(error => console.error("Error al obtener los productos del carrito:", error));
        }
    }, [userId]);

    const renderCartItems = () => {
        if (cart.length === 0) {
            return <p className="text-mediumGray">Aún no tienes productos en el carrito.</p>;
        }
        return cart.map((product, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <p className="text-primary">{product.name}</p>
                <p className="text-primary">${product.price}</p>
            </div>
        ));
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Tu Carrito</h1>
            {renderCartItems()}
        </div>
    );
}

export default Cart;
