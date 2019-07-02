const express = require('express');
const router = express.Router();

// bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//JWT
const jwt = require('jsonwebtoken');

let users = [];
let session = [];

router.post('/register', (req, res, next) => {
    const {body} = req;
    const result = users.filter(user => user.username === body.username);

    if (result.length) {
        return res.status(400).json({
            code: 1,
            data: null,
            mesenge: 'user is exist'
        })
    }

    const token = jwt.sign({username: body.username}, 'abcdf');

    function createHash(password) {
        return new Promise(function(resolve, reject) {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) {
                        return reject(err)
                    }
                    return resolve(hash)
                });
            });
        })
        
    }

    return createHash(body.password).then(function(hash) {
        users.push({
            username: body.username,
            password: hash
        });
        
        session.push(token);
        console.log(session);
        
        return res.status(201).json({
            code: 0,
            data: null
        })
    }).catch(function(err) {
        return res.status(400).json({
            code: 1,
            data: null,
            mesenge: err
        })
    })
});

router.post('/login', (req, res, next) => {
    const {body} = req;
   
    if (!body.token) {
        const result = users.find(user => user.username === body.username);
        if (!result) {
            return res.status(400).json({
                code: 1,
                data: null,
                mesenge: 'user not exist'
            })
        }

        function comparePawword(text, hash) {
            return new Promise(function (resolve, reject) {
                bcrypt.compare(text, hash, function(err, res) {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(res);
                });
            });
        }
        
        return comparePawword(body.password, result.password).then(function(isValidPassword) {
            if(!isValidPassword) {
                return res.status(400).json({
                    code: 1,
                    data: null,
                    mesenge: 'Incorrect password'
                })
            }

            session.push(token);

            return res.status(200).json({
                code: 0,
                data: null,
                mesenge: 'Logged in successfully'
            })
        }).catch(function(err) {
            return res.status(400).json({
                code: 1,
                data: null,
                mesenge: err
            })
        })
    }
    const isSessencExist = session.find(function (token) {
        return token === body.token;
    })

    if (!isSessencExist) {
        return res.status(400).json({
            code: 1,
            data: null,
            mesenge: 'token not exist'
        })
    }
    jwt.verify(body.token, 'abcdf', function(err, data) {
        return res.status(200).json({
            code: 0,
            data: data.username,
            mesenge: 'Logged in successfully'
        })
    });
})

module.exports = router;