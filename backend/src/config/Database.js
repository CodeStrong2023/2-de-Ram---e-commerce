require('dotenv').config();  // Esto carga las variables de entorno desde .env
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Verifica si la variable de conexión está definida
        const dbConnection = process.env.DB_CONNECTION;
        if (!dbConnection) {
            throw new Error("No se encontró la variable DB_CONNECTION en el archivo .env");
        }

        // Conectar a MongoDB
        await mongoose.connect(dbConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
