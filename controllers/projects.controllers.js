import Project from "../models/project.model.js";

import Response from "../helpers/response.handler.js";
import ErrorResponse from "../helpers/error_response.handler.js";
import { BadRequestError, NotFoundError } from "../helpers/userActionErrors.js"

const index = async (req, res) => {

  try {
    const projects = await Project.findAll();
    return res.json(new Response(projects, 200))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message || error, error.statusCode || 500));
  }
}
const show = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new NotFoundError("No existe el proyecto que querés ver.")

    }

    return res.json(new Response(project, 200));

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const store = async (req, res) => {
  
  const {
    name,
    description,
    dateInit,
    dateFinish,
    userId
  } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      dateInit,
      dateFinish,
      userId
    });

    if (!project) {
      throw new BadRequestError('No se pudo crear el proyecto')
    }

    return res.status(201).json(new Response('El proyecto se creó correctamente.', 201));

  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const update = async (req, res) => {
  const projectId = req.params.id;

  const {
    name,
    description,
    dateInit,
    dateFinish,
    userId
  } = req.body;

  try {
    const project = await Project.findByPk(projectId);

    if (!project) {
      throw new NotFoundError('No existe el proyecto que querés actualizar.')
    }

   await project.update({
      name,
      description,
      dateInit,
      dateFinish,
      userId
    });


    return res.json(new Response('El proyecto se actualizó correctamente.', 200));

  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const destroy = async (req, res) => {
  const projectId = req.params.id;

  try {
    const user = await Project.destroy({
      where: {
        id: projectId
      }
    });

    if (!user) {
      throw new NotFoundError('No existe el proyecto que querés eliminar.')
    };

    return res.json(new Response('El proyecto se eliminó correctamente.', 200));

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
