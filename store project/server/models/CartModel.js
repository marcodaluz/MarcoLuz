import { INTEGER, DataTypes } from "sequelize";
import { database } from "../config/context/database.js";
import { UserModel } from "./UserModel.js";
import moment from "moment";

const CartModel = database.define("cart_models", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
});

export { CartModel };
