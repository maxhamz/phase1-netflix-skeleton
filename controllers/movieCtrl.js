const {Movie, User, Playlist} = require("../models")
const sequelize = require("sequelize")
const Op = sequelize.Op
let headers
let movieId
let userNow
let userId
let editParams
let goTo
let movie
let movies
class MovieCtrl {

    static findAll(req, res) {
        let user_name = req.session.username
        userNow = {
            id: req.session.userid,
            username: req.session.username,
            age: req.session.age
        }
        console.log(`current session is`);
        console.log(req.session);
        console.log(`CHECKING: ${user_name} is LOGGED IN`);

        // RETRIEVE USERID & USERNAME FIRST

        Movie.findAll({
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                {
                    model: Playlist,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ],
             order:[['name', 'ASC']]
        })
        .then(movies => {
            // console.log(`List of movies`);
            // console.log(movies);
            // console.log(`headers are`);
            // console.log(Object.keys(movies[0].rawAttributes)); //get headers
            // console.log(`Sample movie variable`);
            // console.log(movies[0]);
            // console.log(movies[0].dataValues);
            // console.log(movies[0].dataValues.id);
            res.render("movies.ejs", {errors: null, data:movies, user:userNow, headers : Object.keys(movies[0].rawAttributes)})
        })
        .catch(err => {
            // console.log(err);
            res.send(err)
        })
    }

    static add2Playlist(req, res) {
        // console.log(`before adding to playlist`)
        // console.log(`req body is`);
        // console.log(req.body);
        // console.log(`but req params is`);
        // console.log(req.params);
        // console.log(`whos' logging in now?`);
        // console.log(req.session);
        movieId = +req.params.movieId
        userNow = {
            id: req.session.userid,
            username: req.session.username,
            age: req.session.age
        }

        // console.log(`movieId is`);
        // console.log(`${movieId} ${typeof movieId}`);
        // console.log(`UserId is ${userNow.id} ${typeof userNow.id}`);

        Playlist.create({
            MovieId: movieId,
            UserId: userNow.id
        })
        .then(result => {
            // console.log(`you have added this movie!`);
            // console.log(result);

            goTo = "/playlists/"+userNow.id
            // console.log(`redirecting to ${goTo}`);
            res.redirect(goTo)
        })
        .catch(err => {
            res.send(err)
        })
    }


    static getEdit(req, res) {
        userNow = {
            id: req.session.userid,
            username: req.session.username,
            age: req.session.age
        }
        movieId = req.params.movieId
        Movie.findOne({
            where: {
                id: movieId
            }
        })
        .then(result1 => {
            movie = result1
            return Movie.findAll()
        })
        .then(result2 => {
            movies = result2
            headers = movie.rawAttributes
            res.render("editMovie.ejs", {errors:null, datum:movie, 
                data:movies, user:userNow, headers:headers})
        })
    }


    static edit(req, res) {
        editParams = {
            name: req.body.name,
            release_year: req.body.release_year,
            genre: req.body.genre,
            audience: req.body.audience
        }

        console.log(`movie id is ${req.params.movieId}`);
        console.log(`Edit params are: `);
        console.log(editParams);

        Movie.update(
            editParams,
            {
                where: {
                    id: {
                        [Op.eq]: req.params.movieId
                    }
                }
            }
        )
        .then(result => {
            console.log(`edited movie is`);
            console.log(result);
            res.redirect("/movies")
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = MovieCtrl