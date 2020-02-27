const playlistRoute = require("express").Router()
const PlaylistCtrl = require("../controllers/playlistCtrl")

playlistRoute.get("/:userId", PlaylistCtrl.showPlaylist)
playlistRoute.get("/deleteMovie/:movieId", PlaylistCtrl.dropMovie)

module.exports = playlistRoute