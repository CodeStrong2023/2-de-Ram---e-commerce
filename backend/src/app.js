import express from "express";
import connectDB from "./config/Database.js";
import routes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.use("/api", routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
