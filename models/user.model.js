import { DataTypes, sequelize } from '../database/config.js';
import Project from './project.model.js';

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  lastName: { type: DataTypes.STRING },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.lastName + ', ' + this.name
    }
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,  
}, {
  sequelize,
  paranoid: true,
  modelName: 'User',
  tableName: 'users',
  underscored: true
});

console.log('User');
User.sync()

User.hasMany(Project)

Project.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  }
})

export default User;


