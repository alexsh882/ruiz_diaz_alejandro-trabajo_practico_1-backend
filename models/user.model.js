import { DataTypes, sequelize } from '../database/config.js';
import Project from './project.model.js';

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING(50) },
  lastName: { type: DataTypes.STRING(50) },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.lastName + ', ' + this.name
    }
  },
  username: { type: DataTypes.STRING(50), unique: true },
  password: { type: DataTypes.STRING(60) },
}, {
  sequelize,
  paranoid: true,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  }
});

console.log('User');



User.sync()

export default User;


