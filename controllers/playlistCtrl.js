const {Movie, User, Playlist} = require("../models")
const sequelize = require("sequelize")
const Op = sequelize.Op
let goTo
let movieId
let userId
let userNow

class PlaylistCtrl {

    static showPlaylist(req, res) {
        userId = req.session.userid
        userNow = {
            id: req.session.userid,
            username: req.session.username,
            age: req.session.age
        }
        Playlist.findAll({
            include: [
                {model: Movie},
                {model: User}
            ],
            where: {
                UserId: req.session.userid
            }
        })
            .then(result => {
            // console.log(`Your playlist is`);
            // console.log(result);
            // console.log(`First Movie`);
            // console.log(result[0].Movie);
            // result[i].Movie.dataValues.id
            // console.log(`sample movie`);
            // console.log(result[0].Movie);
            // console.log(result[0].Movie.dataValues);
            res.render("playlists.ejs", {errors: null, data:result, 
                user:userNow, headers : Object.keys(result[0].Movie.rawAttributes)})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static dropMovie(req, res) {
        console.log(`which movie id you wanna delete?`);
        console.log(req.params.movieId);
        console.log(`whoseuserid now`);
        console.log(req.session);
        userId = req.session.userid
        movieId = req.params.movieId

        Playlist.destroy({
            where: {
                MovieId: movieId,
                UserId: userId
            }
        })
        .then(result => {
            console.log(`we have just deleted`);
            console.log(result);
            res.redirect("/movies")
        })
        .catch(err => {
            res.send(err)
        })
    }

}

module.exports = PlaylistCtrl