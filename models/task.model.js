import { DataTypes, sequelize } from '../database/config.js';


const Task = sequelize.define('Task', {
  task: DataTypes.STRING,
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }  
}, {
  sequelize,
  paranoid: true,
  modelName: 'Task',
  tableName: 'tasks',
  underscored: true
});

console.log('Task');
Task.sync()

export default Task;


