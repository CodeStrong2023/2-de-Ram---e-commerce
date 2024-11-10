// src/pages/Products.jsx

import React, { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError("No se pudieron cargar los productos. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Obtener los productos al cargar la página
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para agregar un producto al carrito
  const addToCart = async (product) => {
    const response = await api
      .post("/cart", { productId: product._id, quantity: 1 })
      .catch((error) => console.error("Error al actualizar el carrito:", error));
  };

  if(loading) {
    return <div className="text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-[#00747C] mb-6 text-center">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={() => addToCart(product)} // Pasamos la función al componente ProductCard
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
