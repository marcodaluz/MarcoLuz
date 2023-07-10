import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProductById,
  getProductById,
  updateProductQuantity,
} from "../controllers/ProductController.js";
import {authRequired} from"../utils/jwt.js";
const productRoutes = Router();

productRoutes.get("/", getAllProducts);
productRoutes.post("/",authRequired, createProduct);
productRoutes.put("/:id", authRequired,updateProduct);
productRoutes.delete("/:id",authRequired, deleteProductById);
productRoutes.get("/:id",authRequired, getProductById);
productRoutes.put("/quantity/:id",authRequired, updateProductQuantity);

export { productRoutes };
