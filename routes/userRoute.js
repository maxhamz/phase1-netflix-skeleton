const userRoute = require("express").Router()
const UserCtrl = require("../controllers/userCtrl.js")

// userRoute.post("/login", UserCtrl.login)
userRoute.post("/login", (req, res, next) => {
    (!req.session.isLogin) ? next() : res.redirect("/")
}, UserCtrl.login)

userRoute.post("/signup", UserCtrl.signup)

// userRoute.get("/logout", UserCtrl.logout)
userRoute.get("/logout", (req, res, next) => {
    (req.session.isLogin) ? next() : res.redirect("/login")
}, UserCtrl.logout)



module.exports = userRoute