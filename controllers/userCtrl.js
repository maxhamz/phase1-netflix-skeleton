const {Movie, User, Playlist} = require("../models")
const sequelize = require("sequelize")
const Op = sequelize.Op
let user_name
let passcode
let byear
let msg
let isLogin = false

class UserCtrl {

    static loginForm(req, res) {
        res.render("login.ejs", {errors: null})
    }

    static signupForm(req, res) {
        res.render("signup.ejs", {errors: null})
    }

    static login(req, res) {
        // console.log(`hang on! before u login`);
        // console.log(req.body);
        user_name = req.body.username
        passcode = req.body.password

        User.findOne({
            where: {
                username : {
                    [Op.eq] : user_name
                }
            }
        })
        .then(result => {
            // console.log(`username found`);
            // console.log(result);
            // console.log(`password mathcing`);
            // console.log(result.validPassword(req.body.password));
            if (result && result.validPassword(req.body.password)) {
                req.session.isLogin = true
                req.session.userid = result.dataValues.id
                req.session.username = user_name
                req.session.age = result.getAge()
                console.log(`login status is: ${req.session.isLogin}`);
                res.redirect("/movies/")
            } else {
                res.render("/login", {errors:'wrong username/password'})
            }
        })
        .catch(err => {
            // console.log(err);
            res.render("/login", {errors: err})
        })

    }

    static signup(req, res) {
        // console.log(`req body is`);
        // console.log(req.body);
        User.create({
            username: req.body.username,
            password: req.body.password,
            birth_year: +req.body.birth_year
        })
        .then(datum => {
            res.redirect("/login")
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy(err => {
            res.redirect("/")
        })
    }

}

module.exports = UserCtrl