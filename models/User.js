const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  // Create method checkPassword that takes in the loginPw and uses bcrypt's compareSync to check if the passwords match. this.password is the encrypted password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    }
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    // Table configuration options
    sequelize, 
    timestamps: false, 
    freezeTableName: true, 
    underscored: true, 
    modelName: 'user' 
  }
);

module.exports = User;