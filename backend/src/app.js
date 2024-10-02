import express from "express";
import connectDB from "./config/mongo.config.js";
import routes from "./routes/index.routes.js";
import { errorHandler } from "./exceptions/errorHandler.js";

// Conectar a la base de datos
connectDB();
const app = express();

app.use(express.json());


// Rutas de la API
app.use("/api", routes);

// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
