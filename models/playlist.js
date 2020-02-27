'use strict';
module.exports = (sequelize, DataTypes) => {
  class Playlist extends sequelize.Sequelize.Model{}
  Playlist.init({
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Playlist"
  });
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsTo(models.User)
    Playlist.belongsTo(models.Movie)
  };
  return Playlist;
};