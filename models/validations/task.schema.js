import { checkSchema } from "express-validator";

import Project from "../project.model.js";

export const taskCreateValidation = checkSchema({
    task: {
        notEmpty: {
            errorMessage: 'El campo tarea es obligatorio'
        },
        isLength: {
            options: { max: 50, min: 4 },
            errorMessage: 'El campo tarea admite un mínimo de 4 y un máximo de 50 caracteres.'
        }
    },
    status : {
        isBoolean: {
            errorMessage: 'El campo solo admite un valor true o false.'
        }
    },
    projectId: {
        notEmpty: {
            errorMessage: 'El campo projectId es obligatorio'
        },
        custom: {
            options: async (value) => {
                return Project.findOne({ where: { id: value } }).then((project) => {
                    if (!project) {
                        throw new Error('El proyecto que queres relacionar no existe en nuestros sistemas.');
                    }
                })
            }
        }
    }
});
