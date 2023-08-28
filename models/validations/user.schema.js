import { checkSchema } from "express-validator";

import User from "../user.model.js";

export const userValidation = checkSchema({
  name: {
    notEmpty: {
      errorMessage: "El campo nombre es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo nombre admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: "El campo apellido es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 4 },
      errorMessage:
        "El campo apellido admite un mínimo de 4 y un máximo de 50 caracteres.",
    },
  },
  username: {
    notEmpty: {
      errorMessage: "El campo username es obligatorio",
    },
    isLength: {
      options: { max: 50, min: 2 },
      errorMessage:
        "El campo username admite un mínimo de 2 y un máximo de 50 caracteres.",
    },
    custom: {
      options: async (value, { req }) => {
        const userId = req.params.id;

        return await User.findOne({ where: { username: value } }).then(
          (user) => {
            if (user.id != userId) {
              throw new Error(
                "El usuario ya existe en la base de datos del sistema."
              );
            }
          }
        );
      },
    },
  },
  password: {
    notEmpty: {
      if: (value, { req }) => !req.params.id,
      errorMessage: "El campo contraseña es obligatorio",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "La contraseña debe tener al menos 6 caracteres.",
    },
  },
});
