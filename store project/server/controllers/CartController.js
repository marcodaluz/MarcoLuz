import { CartModel } from '../models/CartModel.js';

const getAllCarts = async (req, res) => {
  try {
    const carts = await CartModel.findAll();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve carts.' });
  }
};

const createCarts = async (req, res) => {
  try {
    const cart = await CartModel.create(req.body);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create cart.' });
  }
};

const updateCarts = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRowsCount, updatedRows] = await CartModel.update(req.body, {
      where: { id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.json(updatedRows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cart.' });
  }
};

const deleteCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await CartModel.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cart' });
  }
};

const getCartById = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await CartModel.findByPk(id);
    if (!cart) {
      res.status(404).json({ error: 'Order not found.' });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve order.' });
  }
};

export {getAllCarts, createCarts, updateCarts, deleteCartById, getCartById };
