// src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#202022] text-[#CACACA] py-4">
            <div className="container mx-auto text-center">
                <p>Seguinos en redes sociales:</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="hover:text-[#00BBC9]">Facebook</a>
                    <a href="#" className="hover:text-[#00BBC9]">Instagram</a>
                    <a href="#" className="hover:text-[#00BBC9]">Twitter</a>
                </div>
                <p className="mt-4">© 2024 Pagina creada por 2 de Ram - <i>Todos los derechos reservados</i></p>
            </div>
        </footer>
    );
}

export default Footer;
