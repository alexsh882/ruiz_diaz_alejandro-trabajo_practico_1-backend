import { DataTypes, sequelize } from '../database/config.js';
import Task from './task.model.js';


const Project = sequelize.define('Project', {
  name: { type: DataTypes.STRING(50) },
  description: DataTypes.TEXT,
  dateInit: {
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
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


export default Project;


