const bcrypt = require("bcrypt-nodejs");


function hashPassword(text) {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(text, salt)
}

module.exports = hashPassword