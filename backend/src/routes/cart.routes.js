import  CartController  from '../controllers/cart.controller.js'; // Verifica la ruta
import { IsLoginMiddleware } from '../middlewares/isLogin.middleware.js';
import Router from 'express';

const cartController = new CartController();
const isLoginMiddleware = new IsLoginMiddleware();
const router = Router();

router.post('/', isLoginMiddleware.isLogin, cartController.addToCart); // Asegúrate de que `addToCart` esté definido
router.get('/', isLoginMiddleware.isLogin, cartController.getCartByUserId); // Asegúrate de que `getCartByUserId` esté definido
router.delete('/:cartId', isLoginMiddleware.isLogin, cartController.deleteCart); // Asegúrate de que `deleteCart` esté definido


export default router;