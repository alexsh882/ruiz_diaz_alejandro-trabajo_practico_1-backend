import { Router } from "express";
import { index, show, store, update, destroy } from "../controllers/users.controllers.js";
import { userFormValidation } from "../models/validations/user_schema.js";
import { validateSchema } from "../models/validations/validation.js";

const router = Router();

// API CRUD
//Ruta para obtener el listado de usuarios
router.get("/api/users", index);
//Ruta para obtener un usuario
router.get("/api/users/:id/show", show);
//Ruta para actualizar un usuario
router.get("/api/users/:id/update", update);
//Ruta para crear un usuario
router.post("/api/users", userFormValidation, validateSchema ,store);
//Ruta para eliminar un usuario
router.delete("/api/users/:id/destroy", destroy);

export default router;