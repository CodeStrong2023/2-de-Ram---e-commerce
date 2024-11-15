import api from '../utils/axios'; // La instancia de axios que ya tienes configurada

// Función para obtener los items del carrito
export const getCartItems = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.get('/cart', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Retorna los productos del carrito
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un item del carrito
export const removeCartItem = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.delete(`/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // Devuelve el carrito actualizado
  } catch (error) {
    throw error;
  }
};

// Función para aumentar la cantidad de un producto en el carrito
export const increaseProductQuantity = async (productId, adjustment = 1) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.patch(
      `/cart/increase/${productId}`,
      { adjustment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data; // Devuelve el carrito actualizado
  } catch (error) {
    throw error;
  }
};

// Función para disminuir la cantidad de un producto en el carrito
export const decreaseProductQuantity = async (productId, adjustment = 1) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await api.patch(
      `/cart/decrease/${productId}`,
      { adjustment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data; // Devuelve el carrito actualizado
  } catch (error) {
    throw error;
  }
};
