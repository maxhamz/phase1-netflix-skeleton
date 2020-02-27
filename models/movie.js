'use strict';
module.exports = (sequelize, DataTypes) => {

  class Movie extends sequelize.Sequelize.Model{}
  Movie.init({
      name: DataTypes.STRING,
      release_year: DataTypes.INTEGER,
      genre: DataTypes.STRING,
      audience: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Movie"
  });
  Movie.associate = function(models) {
    // associations can be defined here
    Movie.hasMany(models.Playlist)

    Movie.belongsToMany(models.User,
      {
        through: models.Playlist
      })
  };
  return Movie;
};