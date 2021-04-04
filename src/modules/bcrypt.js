var bcrypt = require('bcrypt')

function encriptar(obj) {
    return bcrypt.hash(obj, 10, function (err, hash) {
        if (err) {
            console.log('[BCRYPT] ' + err)
        }
        return hash.length
    });
}



module.exports = {
    encriptar
}