import bcryptjs from 'bcryptjs';

import User from "../models/user.model.js";
import Response from "../helpers/response.handler.js";
import ErrorResponse from "../helpers/error_response.handler.js";
import { BadRequestError, NotFoundError } from "../helpers/userActionErrors.js"
import Project from '../models/project.model.js';

const index = async (req, res) => {

  try {
    const users = await User.findAll();
    return res.json(new Response(users, 200))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message || error, error.statusCode || 500));
  }
}


const show = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId,{
      include:{
        model: Project,
        attributes:['name'],
      }
    });

    if (!user) {
      throw new NotFoundError("No existe el usuario con el id " + userId)

    }

    return res.json(new Response(user, 200));

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const store = async (req, res) => {
  const {
    name,
    lastName,
    username,
    password,
  } = req.body;

  let passHash = await bcryptjs.hash(password, 3);

  try {
    const user = await User.create({
      name,
      lastName,
      username,
      password: passHash
    });

    if (!user) {
      throw new BadRequestError('No se pudo crear el usuario')
    }

    return res.status(201).json(new Response('El usuario se creó correctamente.', 201));

  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}


const update = async (req, res) => {
  const userId = req.params.id;

  const {
    name,
    lastName,
    username
  } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new NotFoundError('No existe el usuario que querés actualizar.')
    }

    await user.update({
      name,
      lastName,
      username,
    });


    return res.json(new Response('El usuario se actualizó correctamente.', 200));

  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const destroy = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.destroy({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new NotFoundError('No existe el usuario que querés eliminar.')
    };

    return res.json(new Response('El usuario se eliminó correctamente.', 200));

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}


export {
  index,
  show,
  store,
  update,
  destroy
};
