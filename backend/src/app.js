import express from "express";
import connectDB from "./config/Database.js";
import cartRoutes from "./routes/cart.routes.js"; // Importa las rutas del carrito
import productRoutes from "./routes/product.routes.js"; // Importa las rutas de productos
import userRoutes from "./routes/user.routes.js"

const app = express();

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.use("/api/cart", cartRoutes); // Agrega las rutas del carrito
app.use("/api/products", productRoutes); // Agrega las rutas de productos
app.use("/api/users",userRoutes)


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
