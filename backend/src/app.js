import connectDB from "./config/mongo.config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import envsConfig from "./config/envs.config.js";
import { errorHandler } from "./exceptions/errorHandler.js";
import express from "express";
import routes from "./routes/index.routes.js";

// Conectar a la base de datos
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", routes);

// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = envsConfig.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
