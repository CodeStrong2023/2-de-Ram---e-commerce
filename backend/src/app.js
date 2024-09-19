require('dotenv').config(); // Cargar el archivo .env al inicio
const express = require('express');
const connectDB = require('./config/Database');
const userRoutes = require('./routes/UserRoutes');

const app = express();

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.use('/api', userRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
