import React, { createContext, useEffect, useState } from "react";

import api from "../utils/axios";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para verificar si el usuario está logueado
  const verifyLogin = async () => {
    try {
      const response = await api.get("/auth/verify");
      if (response.data.loggedIn) {
        setUser(response.data.user); // Puedes ajustar esto según la respuesta de tu backend
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Cargar el estado del usuario al montar el componente
  useEffect(() => {
    verifyLogin();
  }, []);

  // Función para hacer login
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  // Función para hacer logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const values = {
    user,
    loading,
    login,
    logout,
  }

  // Proveer el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
