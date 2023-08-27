import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { sequelize } from './database/config.js';
import usersRoutes from './routes/users.routes.js';
import projectsRoutes from './routes/projects.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));



// Se ejecuta una instancia de conexión a la base de datos
sequelize.authenticate()
  .then(() => { 
    console.log('Conexión a base de datos exitosa');
 })
  .catch((error) => console.log('Error al conectar a base de datos', error));

app.use("/", usersRoutes);
app.use("/", projectsRoutes);
app.use("/", tasksRoutes);

app.use(function (req, res, next) {
  
  res.status(404).json({
    message: "El recurso al que queres acceder, no existe.",
    status: 404
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor en ${process.env.APP_URL}:${process.env.APP_PORT}`);
});
