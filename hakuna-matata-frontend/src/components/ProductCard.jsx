// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
            <img src={product.images} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-[#00747C]">{product.name}</h3>
                <p className="text-[#878787] mt-2">${product.price}</p>
                <button 
                    onClick={onAddToCart}  // Llamar a la función para agregar al carrito
                    className="bg-[#00747C] text-white py-2 px-4 rounded mt-4 hover:bg-[#00BBC9] w-full"
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
