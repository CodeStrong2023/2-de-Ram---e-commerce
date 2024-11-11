// frontend/src/services/paymentService.js
import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/payments';  // Cambia la URL si es necesario

export const createPaymentPreference = async (items) => {
  try {
    // Hacemos la llamada al backend para crear la preferencia de pago
    const response = await axios.post(`${apiUrl}/create_preference`, { items });
    return response.data.init_point;  // Devuelve el enlace de Mercado Pago
  } catch (error) {
    console.error('Error al crear la preferencia de pago:', error);
    throw error;
  }
};
