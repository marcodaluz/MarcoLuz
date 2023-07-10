import { Router } from "express";
import {
  getAllCartItem,
  createCartItem,
  updateCartItem,
  deleteCartItemById,
  getCartItemById,
  emptyCartByUserId,
} from "../controllers/CartItemController.js";
import {authRequired} from '../utils/jwt.js';
const cartItemRoutes = Router();

cartItemRoutes.get("/:id",authRequired, getAllCartItem);
cartItemRoutes.post("/",authRequired, createCartItem);
cartItemRoutes.put("/:id",authRequired, updateCartItem);
cartItemRoutes.delete("/:id",authRequired, deleteCartItemById);
cartItemRoutes.get("/item/:id",authRequired, getCartItemById);
cartItemRoutes.delete("/empty/:user_id",authRequired, emptyCartByUserId);

export { cartItemRoutes };
