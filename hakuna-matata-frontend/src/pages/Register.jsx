import React, { useState } from 'react';

import axios from 'axios';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = { firstName, lastName, email, password };
            // const response = await axios.post('localhost:8080/api/auth/register', userData);
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            console.log('User registered successfully:', data);
            
            // Puedes redirigir o mostrar un mensaje de éxito aquí
        } catch (err) {
            setError('Error al registrar el usuario');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="container mx-auto p-8 max-w-md">
            
            <form onSubmit={handleSubmit} className="bg-lightGray p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Crear Cuenta</h1>
                <label className="block mb-4">
                    <span className="text-gray">Nombre</span>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full mt-1 p-2 rounded-md border border-gray"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray">Apellido</span>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full mt-1 p-2 rounded-md border border-gray"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray">Correo Electrónico</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full mt-1 p-2 rounded-md border border-gray"
                    />
                </label>
                <label className="block mb-4">
                    <span className="text-gray">Contraseña</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full mt-1 p-2 rounded-md border border-gray"
                    />
                </label>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button className="bg-primary text-white py-2 px-4 rounded-full w-full hover:bg-secondary">
                    Registrarse
                </button>
            </form>
        </div>
    );
}

export default Register;
