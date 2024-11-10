/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00747C",    // Color principal
        secondary: "#00BBC9",  // Color secundario
        lightGray: "#CACACA",  // Gris claro
        mediumGray: "#878787", // Gris medio
        dark: "#202022",       // Color oscuro
      },
    },
  },
  plugins: [],
};
