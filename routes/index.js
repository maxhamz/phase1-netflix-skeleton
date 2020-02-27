const router = require("express").Router()
const userRoute = require("./userRoute")
const movieRoute = require("./movieRoute")
const playlistRoute = require("./playlistRoute")
const MainCtrl = require("../controllers/mainCtrl")
const UserCtrl = require("../controllers/userCtrl")

router.get("/", MainCtrl.showHome)
router.get("/login", UserCtrl.loginForm)
router.get("/signup", UserCtrl.signupForm)
router.use("/users", userRoute)
router.use("/movies", movieRoute)
router.use("/playlists", playlistRoute)

module.exports = router