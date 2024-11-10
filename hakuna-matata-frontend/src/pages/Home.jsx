// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="bg-[#f9f9f9] min-h-screen flex items-center justify-center">
            <div className="container mx-auto p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
                <div className="w-full md:w-1/2">
                    <img src="https://cdn.pixabay.com/photo/2023/05/15/14/35/cat-7995231_1280.jpg" alt="Animales" className="w-full rounded-lg grayscale" />
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-[#00747C]">Hakuna Matata</h2>
                    <p className="text-lg text-[#878787] mt-4 mb-8">Encontra lo mejor para tus mascotas, con la calidad que nos caracteriza</p>
                    <Link to="/products" className="bg-[#00747C] text-white px-6 py-3 rounded-lg hover:bg-[#00BBC9] transition">
                        Ver Productos
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
