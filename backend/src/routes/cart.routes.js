import Router from 'express';
import  CartController  from '../controllers/cart.controller.js'; // Verifica la ruta

const cartController = new CartController();
const router = Router();

router.post('/', cartController.addToCart); // Asegúrate de que `addToCart` esté definido
router.get('/:userId', cartController.getCartByUserId); // Asegúrate de que `getCartByUserId` esté definido
router.delete('/:cartId', cartController.deleteCart); // Asegúrate de que `deleteCart` esté definido


export default router;