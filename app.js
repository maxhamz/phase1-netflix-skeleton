const PORT = 4000
const express = require("express")
const session = require("express-session")
const app = express()
const router = require("./routes/index.js")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:true}))
// app.use(express.static(__dirname + "/public"))
app.use(session({
    secret: "jajajijijuju",
    resave: false,
    saveUninitialized: true
}))

app.use(router)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})