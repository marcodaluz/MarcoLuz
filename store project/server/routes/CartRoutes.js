import Router from 'express';
import {
  getAllCarts,
  createCarts,
  updateCarts,
  deleteCartById,
  getCartById,
} from '../controllers/CartController.js';
import {authRequired} from '../utils/jwt.js';
const cartRoutes = Router();

cartRoutes.get("/",authRequired, getAllCarts);
cartRoutes.post('/',authRequired, createCarts);
cartRoutes.put('/:id',authRequired, updateCarts);
cartRoutes.delete('/:id',authRequired, deleteCartById);
cartRoutes.get('/:id',authRequired, getCartById);



export {cartRoutes};
