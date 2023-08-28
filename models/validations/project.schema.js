import { checkSchema } from "express-validator";

import User from "../user.model.js";


export const projectValidation = checkSchema({
    name: {
        notEmpty: {
            errorMessage: 'El campo nombre es obligatorio'
        },
        isLength: {
            options: { max: 50, min: 4 },
            errorMessage: 'El campo nombre admite un mínimo de 4 y un máximo de 50 caracteres.'
        }
    },
    description: {
        exists: {
            errorMessage: 'El campo descripción debe existir en tu petición, aunque es opcional.'
        }
    },
    dateInit: {
        notEmpty: {
            errorMessage: 'El campo fecha inicio es obligatorio'
        },
        isISO8601:{
            errorMessage: "El valor de este campo debe ser una fecha con hora."
        }
    },
    dateFinish: {
        optional: true
    },
    userId: {
        notEmpty: {
            errorMessage: 'El campo user_id es obligatorio'
        },
        custom: {
            options: async (value) => {
                return User.findOne({ where: { id: value } }).then((user) => {
                    if (!user) {
                        throw new Error('El usuario que queres relacionar no existe en nuestros sistemas.');
                    }
                })
            }
        }
    }
});