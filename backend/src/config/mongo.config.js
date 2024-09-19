import mongoose from 'mongoose';
import config from './envs.config.js'; // Ajusta la ruta si es necesario

const connectDB = async () => {
  try {
    console.log(`MONGO_URL: ${config.MONGO_URL}`); // Verifica el valor de MONGO_URL
    const conn = await mongoose.connect(config.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Opcional: Salir del proceso si no se puede conectar a la base de datos
  }
};

export default connectDB;
