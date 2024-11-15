import React, { createContext, useEffect, useState } from "react";

import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Función para hacer login
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      setUser(response.data.user);

      navigate("/products");
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
    login,
    logout,
  };

  // Proveer el estado y las funciones a los componentes hijos
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
