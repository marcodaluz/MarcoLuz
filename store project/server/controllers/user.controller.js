import { UserModel } from "../models/UserModel.js";
import { createToken } from "../utils/jwt.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      username: username,
      password: password,
    },
    attributes: { exclude: ["password"] }, // Exclude the 'password' attribute from the query result
  });
  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }
  const token = createToken({
    id: user.id,
    username: user.username,
    batatas: 2,
  });

  return res.json({
    profile: user,
    token,
  });
};

export const register = async (req, res) => {
  const { username, password, role } = req.body;

  const user = await UserModel.create({
    username: username,
    password: password,
    role: role,
  });

  return res.json(user);
};

export const getAll = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
};
export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await UserModel.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Product not found.' });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product.' });
  }
};