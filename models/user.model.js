import { DataTypes, sequelize } from '../database/config.js';


const User = sequelize.define('User', {
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

export default User;


