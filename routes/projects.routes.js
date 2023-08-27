import { Router } from "express";
import { index, show, store, update, destroy } from "../controllers/projects.controllers.js";
import { projectCreateValidation } from "../models/validations/project.schema.js";
import { validateSchema } from "../models/validations/validation.js";


const router = Router();

// API CRUD
//Ruta para obtener el listado de usuarios
router.get("/api/projects", index);
//Ruta para obtener un usuario
router.get("/api/projects/:id/show", show);
//Ruta para actualizar un usuario
router.get("/api/projects/:id/update", update);
//Ruta para crear un usuario
router.post("/api/projects", projectCreateValidation, validateSchema, store);
//Ruta para eliminar un usuario
router.delete("/api/projects/:id/destroy", destroy);

export default router;