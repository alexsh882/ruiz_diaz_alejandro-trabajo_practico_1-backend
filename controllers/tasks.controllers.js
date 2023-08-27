import Task from "../models/task.model.js";

import Response from "../helpers/response.handler.js";
import ErrorResponse from "../helpers/error_response.handler.js";
import { BadRequestError, NotFoundError } from "../helpers/userActionErrors.js"

const index = async (req, res) => {

  try {
    const tasks = await Task.findAll();
    
    return res.json(new Response(tasks, 200))
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message || error, error.statusCode || 500));
  }
}
const show = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByPk(taskId);

    if (!task) {
      throw new NotFoundError("No existe la tarea que querés ver.")

    }

    return res.json(new Response(task, 200));

  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const store = async (req, res) => {

  const {
    task,
    status,
    projectId
  } = req.body;
  try {
    const newTask = await Task.create({
      task,
      status,
      projectId
    });

    if (!newTask) {
      throw new BadRequestError('No se pudo crear la tarea')
    }

    return res.status(201).json(new Response('La tarea se creó correctamente.', 201));

  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const update = async (req, res) => {
  const taskId = req.params.id;

  const {
    task,
    status,
  } = req.body;

  try {
    const updatedTask = await Task.findByPk(taskId);

    if (!updatedTask) {
      throw new NotFoundError('No existe la tarea que querés actualizar.')
    }

    await updatedTask.update({
      task,
      status
    }); 


    return res.json(new Response('La tarea se actualizó correctamente.', 200));

  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json(new ErrorResponse(error.message, error.statusCode));
  }
}
const destroy = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.destroy({
      where: {
        id: taskId
      }
    });

    if (!task) {
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
