import { CartItemModel } from "../models/CartItemModel.js";
import { UserModel } from "../models/UserModel.js";
import { CartModel } from "../models/CartModel.js";

const getAllCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the cart exists for the user
    let cart = await CartModel.findOne({ where: { user_id: id } });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = await CartModel.create({ user_id: id });
    }

    // Get all cart items for the cart
    const cartItems = await CartItemModel.findAll({
      where: { cart_id: cart.id },
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cart items." });
  }
};
const createCartItem = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    // Find the cart corresponding to the user
    let cart = await CartModel.findOne({
      where: { user_id },
    });

    if (!cart) {
      // Create a new cart for the user
      cart = await CartModel.create({ user_id });
    }

    // Check if the product already exists in the cart
    let cartItem = await CartItemModel.findOne({
      where: { cart_id: cart.id, product_id },
    });

    if (cartItem) {
      cartItem.quantidade = cartItem.quantidade + 1;
      await cartItem.save();
      return res.json(cartItem);
    } else {
      // Create a new cart item if the product does not exist in the cart
      cartItem = await CartItemModel.create({
        cart_id: cart.id,
        product_id,
        quantidade: 1,
      });
      return res.json(cartItem);
    }
  } catch (error) {
    console.error("Error creating cart item:", error);
    return res.status(500).json({ message: "Failed to create cart item" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    // Assuming you have a Cart_ItemsModel that represents your cart items table/model

    await CartItemModel.update({ quantidade: quantidade }, { where: { id } });
    return res.json({ message: quantidade });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Failed to update cart item" });
  }
};

const deleteCartItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await CartItemModel.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ error: "Order not found." });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cart" });
  }
};
const getCartItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart_item_models = await CartItemModel.findByPk(id);
    if (!cart_item_models) {
      res.status(404).json({ error: "Order not found." });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve order." });
  }
};

export const emptyCartByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    // Encontra o carrinho correspondente ao user_id
    const cart = await CartModel.findOne({ where: { user_id } });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    // Remove todos os itens do carrinho
    await CartItemModel.destroy({ where: { cart_id: cart.id } });

    return res.json({ message: "Cart emptied successfully." });
  } catch (error) {
    console.error("Error emptying cart:", error);
    return res.status(500).json({ error: "Failed to empty cart." });
  }
};

export { getAllCartItem, createCartItem, deleteCartItemById, getCartItemById };
