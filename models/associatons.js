import Project from "./project.model.js";
import Task from "./task.model.js";
import User from "./user.model.js";

const associate = () => {
  User.hasMany(Project);

  Project.belongsTo(User, {
    foreignKey: {
      name: "userId",
    },
  });
  Project.hasMany(Task);
  Task.belongsTo(Project, {
    foreignKey: {
      name: "projectId",
    },
  });
  console.log('Se asociaron los modelos.');
};

export default associate;
