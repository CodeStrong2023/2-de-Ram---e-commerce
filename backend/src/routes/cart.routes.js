import  CartController  from '../controllers/cart.controller.js'; // Verifica la ruta
import Router from 'express';

const cartController = new CartController();
const router = Router();

router.post('/', cartController.addToCart); // Asegúrate de que `addToCart` esté definido
router.get('/', cartController.getCartByUserId); // Asegúrate de que `getCartByUserId` esté definido
router.delete('/:cartId', cartController.deleteCart); // Asegúrate de que `deleteCart` esté definido


export default router;