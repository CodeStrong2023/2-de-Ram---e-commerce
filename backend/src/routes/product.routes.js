import Router  from 'express';
import ProductController from '../controllers/product.controller.js'; // Importación estilo ES6

const router = Router();
const productController = new ProductController();

// Crear producto
router.post('/', productController.createProduct);

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Actualizar producto por ID
router.put('/:id', productController.updateProduct);

// Borrar producto (borrado lógico)
router.delete('/:id', productController.deleteProduct);

export default router;
