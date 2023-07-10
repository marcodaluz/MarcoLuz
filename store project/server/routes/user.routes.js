import Router from "express";
import { login, register, getAll, deleteUserById } from "../controllers/user.controller.js";
import {authRequired} from"../utils/jwt.js";
//--ROUTES--//
const usersRoutes = Router();

usersRoutes.post("/login", login);

usersRoutes.post("/register", register);

usersRoutes.get("/",authRequired, getAll);

usersRoutes.delete("/:id",authRequired, deleteUserById);
export { usersRoutes };




