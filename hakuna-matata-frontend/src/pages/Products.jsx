// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

function Products() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);  // Estado para el carrito

    // Obtener los productos al cargar la página
    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart, product];
            // Enviar el carrito actualizado al backend si es necesario
            axios.post('http://localhost:3000/api/cart/', { cart: updatedCart })
                .then(response => console.log('Carrito actualizado:', response.data))
                .catch(error => console.error('Error al agregar al carrito:', error));
            return updatedCart;
        });
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold text-[#00747C] mb-6 text-center">Nuestros Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard 
                        key={product._id} 
                        product={product} 
                        onAddToCart={() => addToCart(product)}  // Pasamos la función al componente ProductCard
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;

