import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import { createPaymentPreference } from "../service/paymentService";  // Asegúrate de crear este servicio

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await api.get(`/cart`);
        setCart(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Renderizar los productos del carrito
  const renderCartItems = () => {
    if (loading) {
      return <p>Cargando carrito...</p>;
    }

    if (cart.length === 0) {
      return <p className="text-mediumGray">Aún no tienes productos en el carrito.</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-100 rounded-t-lg">
              <th className="text-left p-4 text-primary font-bold rounded-tl-lg">Producto</th>
              <th className="text-center p-4 text-primary font-bold">Cantidad</th>
              <th className="text-center p-4 text-primary font-bold">Precio</th>
              <th className="text-right p-4 text-primary font-bold rounded-tr-lg">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr
                key={index}
                className={`${index === cart.length - 1 ? "rounded-b-lg" : ""} border-b last:border-none`}
              >
                <td className="text-left p-4">{product.name}</td>
                <td className="text-center p-4">{product.quantity}</td>
                <td className="text-center p-4">{product.price}</td>
                <td className="text-right p-4">${product.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Manejar el proceso de checkout y redirigir a Mercado Pago
  const handleCheckout = async () => {
    try {
      // Preparar los datos del carrito para enviar al backend
      const items = cart.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      }));

      // Llamar al backend para crear la preferencia de pago
      const initPoint = await createPaymentPreference(items);
      
      // Redirigir a Mercado Pago
      window.location.href = initPoint; // El usuario será redirigido al link de Mercado Pago
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert('Hubo un problema al procesar el pago. Intenta nuevamente.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Tu Carrito</h1>
      {renderCartItems()}
      <div className="flex justify-end mt-4">
        <p className="text-xl font-semibold text-primary">Total: ${total.toFixed(2)}</p>
      </div>
      {cart.length > 0 && (
        <div className="flex justify-end mt-8">
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-400"
          >
            Completar Compra
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
