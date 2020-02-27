'use strict';
const hashPassword = require("../helpers/hashPassword.js")
const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{
    getAge() {
      const DISYR = new Date().getFullYear()
      return (DISYR-this.birth_year)
    }

    validPassword(password) {
      return bcrypt.compareSync(password, this.password)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        min8char() {
          if(this.username.length < 8) {
            throw new Error("Username must be at least 8 characters")
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min8char() {
          if(this.username.length < 8) {
            throw new Error("Password must be at least 8 characters")
          }
        }
      }
    },
    birth_year: {
      type: DataTypes.INTEGER,
      validate: {
        pg13() {
          if(this.getAge() < 13) {
            throw new Error("User must be older than 13 years old to signup")
          }
        }
      }
    }
  }, {
    hooks: {

      /*
      HASH PASSWORD USING HELPER
      CREDITS 2: <https://www.codementor.io/@mayowa.a/how-to-build-a-simple-session-based-authentication-system-with-nodejs-from-scratch-6vn67mcy3> 
       */
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }

    },
    sequelize,
    modelName: "User"
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Playlist)
    User.belongsToMany(models.Movie, {
      through: models.Playlist
    })
  };
  return User;
};