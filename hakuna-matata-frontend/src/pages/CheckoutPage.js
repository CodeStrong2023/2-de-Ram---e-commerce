// components/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart') // Cambia la URL a la de tu API
      .then((response) => {
        setCart(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart: ", error);
        setLoading(false);
      });
  }, []);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // Aquí iría la lógica para proceder con el pago
    alert('Checkout successful!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="space-y-4">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex flex-col">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="font-bold">${item.price}</p>
              </div>
              <p className="text-lg font-semibold">${item.price * item.quantity}</p>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-8 text-right">
          <h2 className="text-xl font-semibold">Total: ${getTotal()}</h2>
          <button 
            onClick={handleCheckout} 
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400"
          >
            Complete Purchase
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
