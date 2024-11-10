import axios from 'axios';

// Crea una instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // La URL base de tu API
  withCredentials: true,  // Habilita el envío de cookies en solicitudes entre dominios
});

export default api;
