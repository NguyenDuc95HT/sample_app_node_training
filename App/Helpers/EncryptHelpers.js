const bcrypt = require('bcrypt');
const saltRounds = 10;

function createHash (text) {
    return new Promise(function (resolve, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(text, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                return resolve(hash);
            });
        });
    })
}

function isValidPassword (text, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(text, hash, function(err, res) {
            if(err) {
                return reject(err);
            }
            return resolve(res);
        })
    })
}   

module.exports = {createHash, isValidPassword}
