import { DataTypes, sequelize } from '../database/config.js';
import Task from './task.model.js';
import User from './user.model.js';


const Project = sequelize.define('Project', {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,  
  dateInit: DataTypes.DATE,  
  dateFinish: {
    type: DataTypes.DATE,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }  
}, {
  sequelize,
  paranoid: true,
  modelName: 'Project',
  tableName: 'projects',
  underscored: true
});

console.log('Project');
Project.sync()

Project.hasMany(Task)
Task.belongsTo(Project, {
  foreignKey: {
    name: 'projectId'
  }
})

export default Project;

