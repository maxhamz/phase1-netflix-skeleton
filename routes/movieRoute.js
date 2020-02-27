const movieRoute = require("express").Router()
const MovieCtrl = require("../controllers/movieCtrl.js")

movieRoute.get("/", MovieCtrl.findAll)
movieRoute.post("/add2Playlists/:movieId", MovieCtrl.add2Playlist)

movieRoute.get("/edit/:movieId", MovieCtrl.getEdit)
movieRoute.post("/edit/:movieId", MovieCtrl.edit)

module.exports = movieRoute