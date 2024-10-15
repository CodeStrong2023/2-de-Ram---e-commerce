import express from "express";
import connectDB from "./config/mongo.config.js";
import routes from "./routes/index.routes.js";
import session from "express-session";
import { errorHandler } from "./exceptions/errorHandler.js";
import envsConfig from "./config/envs.config.js";

// Conectar a la base de datos
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la sesión
app.use(
  session({
    secret: envsConfig.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutos
      secure: false,
    },
  })
);
// Rutas de la API
app.use("/api", routes);

// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
const PORT = envsConfig.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
