const sequelize = require("sequelize")
const Op = sequelize.Op

class MainCtrl {
    static showHome(req, res) {
        res.render("homepage.ejs", {errors: null, data:null})
    }
}

module.exports = MainCtrl