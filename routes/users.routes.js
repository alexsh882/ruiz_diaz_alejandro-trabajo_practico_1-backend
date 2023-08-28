import { Router } from "express";
import { index, show, store, update, destroy } from "../controllers/users.controllers.js";
import { userValidation } from "../models/validations/user.schema.js";
import { validateSchema } from "../models/validations/validation.js";

const router = Router();

// API CRUD
//Ruta para obtener el listado de usuarios
router.get("/api/users", index);
//Ruta para obtener un usuario
router.get("/api/users/:id/show", show);
//Ruta para actualizar un usuario
router.put("/api/users/:id/update",userValidation, validateSchema, update);
//Ruta para crear un usuario
router.post("/api/users", userValidation, validateSchema ,store);
//Ruta para eliminar un usuario
router.delete("/api/users/:id/destroy", destroy);

export default router;