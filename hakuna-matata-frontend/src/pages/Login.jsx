// src/pages/Login.jsx

import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const userData = { email, password };
      console.log(userData);
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("User logged in successfully:", data);

      // Puedes redirigir o mostrar un mensaje de éxito aquí
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };
  return (
    <div className="container mx-auto p-8 max-w-md">
      <form
        onSubmit={handleLogin}
        className="bg-lightGray p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Iniciar Sesión
        </h1>
        <label className="block mb-4">
          <span className="text-gray">Correo Electrónico</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="block w-full mt-1 p-2 rounded-md border border-gray"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray">Contraseña</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block w-full mt-1 p-2 rounded-md border border-gray"
          />
        </label>
        <button className="bg-primary text-white py-2 px-4 rounded-full w-full hover:bg-secondary">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
