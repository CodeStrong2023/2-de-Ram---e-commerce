import React, { useEffect, useState } from "react";
import api from "../utils/axios";
import { createPaymentPreference } from "../service/paymentService";

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

 // Función para aumentar la cantidad de un producto
 const increaseProductQuantity = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await api.patch(
      `/cart/increase/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(response.data.products);
    setTotal(response.data.total);
  } catch (error) {
    console.error("Error al aumentar la cantidad del producto:", error);
    alert("Hubo un problema al actualizar la cantidad. Intenta nuevamente.");
  }
};

// Función para disminuir la cantidad de un producto
const decreaseProductQuantity = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await api.patch(
      `/cart/decrease/${productId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(response.data.products);
    setTotal(response.data.total);
  } catch (error) {
    console.error("Error al disminuir la cantidad del producto:", error);
    alert("Hubo un problema al actualizar la cantidad. Intenta nuevamente.");
  }
};

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
              <th className="text-right p-4 text-primary font-bold">Subtotal</th>
              <th className="text-center p-4 text-primary font-bold rounded-tr-lg">Acciones</th>
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
                <td className="text-center p-4">${product.price.toFixed(2)}</td>
                <td className="text-right p-4">${product.subtotal.toFixed(2)}</td>
                <td className="text-center p-4">
                  <button
                    onClick={() => increaseProductQuantity(product.productId, 1)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-400 mx-1"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decreaseProductQuantity(product.productId, -1)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-400 mx-1"
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handleCheckout = async () => {
    try {
      const items = cart.map((product) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      }));

      const initPoint = await createPaymentPreference(items);
      window.location.href = initPoint;
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un problema al procesar el pago. Intenta nuevamente.");
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
