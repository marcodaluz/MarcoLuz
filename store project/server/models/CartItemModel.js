import { INTEGER, DataTypes } from "sequelize";
import { database } from "../config/context/database.js";
import { CartModel } from "./CartModel.js";
import { ProductModel } from "./ProductModel.js";

const CartItemModel = database.define("cart_item_models", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quantidade: {
    type: INTEGER,
    allowNull: true,
  },
  cart_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: CartModel,
      key: "id",
    },
  },
  product_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: ProductModel,
      key: "id",
    },
  },
});

export { CartItemModel };
