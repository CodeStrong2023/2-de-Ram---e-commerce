import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno

const connectDB = async () => {
    try {
        const uri = 'mongodb+srv://2deram:admin@2deramecommerce.kybvs.mongodb.net/?retryWrites=true&w=majority&appName=2deRamEcommerce'; // Obtener la URI de MongoDB
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Salir del proceso si hay un error
    }
};

export default connectDB;
