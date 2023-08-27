import { Router } from "express";
import { index, show, store, update, destroy } from "../controllers/tasks.controllers.js";

import { taskCreateValidation } from "../models/validations/task.schema.js";
import { validateSchema } from "../models/validations/validation.js";

const router = Router();

// API CRUD
//Ruta para obtener el listado de usuarios
router.get("/api/tasks", index);
//Ruta para obtener un usuario
router.get("/api/tasks/:id/show", show);
//Ruta para actualizar un usuario
router.get("/api/tasks/:id/update", update);
//Ruta para crear un usuario
router.post("/api/tasks", taskCreateValidation, validateSchema, store);
//Ruta para eliminar un usuario
router.delete("/api/tasks/:id/destroy", destroy);

export default router;