const UserModel = require('../../Models/UserModel');
const TokenModel = require('../../Models/TokenModel');
const Encrypt = require('../../Helpers/EncryptHelpers');
const jwt = require('jsonwebtoken');

class AuthController {
    constructor() {
        this.userModel = UserModel;
        this.tokenModel = TokenModel;
    }

    async register({req, res, next}) {
        
        const {body} = req;
        if(!body.username || !body.password) {
            return res.status(400).json({
                code: 1,
                data: null,
                messenge: 'username or password is required'
            })
        }
        
        const user = await this.userModel.query()
            .where('username', body.username)
            .first();
        
        if(user) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'user is exist'
            });
        }
        
        const password = await Encrypt.createHash(body.password);
        
        const dataInsert = {
            username: body.username,
            password,
            name: body.name
        };
        

        const userInserted = await this.userModel.query()
            .insert(dataInsert);

        let token = jwt.sign({
            id: userInserted.id,
            timestam: new Date().getTime()
        }, Env.APP_KEY)

        const dataTokenInsert = {
            user_id: userInserted.id,
            token,
            status: "1"
        }
       
        await this.tokenModel.query().insert(dataTokenInsert);
        
        return res.status(201).json({
            code: 0,
            data: {
                id: userInserted.id,
                token
            },
            message: 'register success'
        })

    }

    async login({req, res, next}) {
        const {body} = req;
        if(!body.username || !body.password) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'username or password is required field'
            });
        }
        const user = await this.userModel.query()
            .where('username', body.username)
            .first();
        if(!user) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'user not found'
            });
        }
        const isValidPass = await Encrypt.isValidPassword(body.password, user.password);
        
        if(!isValidPass) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'password not vaild'
            });
        }
        let token = jwt.sign({
            id: user.id,
            timestam: new Date().getTime()
        }, Env.APP_KEY);
        const tokenInserted = {
            user_id: user.id,
            token,
            status: '1'
        }
        await this.tokenModel.query().insert(tokenInserted);

        return res.status(200).json({
            code: 0,
            data: {
                id: user.id,
                token
            }
        });
    }

    async logout({req, res, next}) {
        const {headers} = req;
        const token = headers.authorization;
        if(!token) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'no token'
            });
        }
        this.tokenModel.query().delete().where('token', token);

        return res.status(200).json({
            code: 0,
            data: null,
            message: 'successfully deleted'
        })
    }
}

module.exports = new AuthController();
