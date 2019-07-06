const jwt = require('jsonwebtoken');
const TokenModle = require('../Models/TokenModel');

class AuthMiddleware {
    constructor() {
        this.tokenModle = TokenModle;
    }
    /**
     * auth function.
     * @description: middlware check authentication od user.
     * @param req Request
     * @param res Response
     * @param next Next funcion
     */

    async auth({req, res, next}) {
        const {headers} = req;
        const token = headers.authorization;

        //Check token is exist
        if(!token) {
            return next({
                code: 1,
                data: null,
                message: 'UnAuthorization'
            })
        }

        const hasToken = await this.tokenModle.query().where('token', token).first();
        
        if(!hasToken) {
            return next({
                code: 1,
                data: null,
                message: 'UnAuthorization'
            })
        }

        if(hasToken.status === '0') {
            return next({
                code: 1,
                data: null,
                message: 'user has logged out of the system.'
            })
        }

        const dataToken = jwt.verify(token, Env.APP_KEY, function(err, data) {
            return data;
        });

        req.user = dataToken;
        next();
    }

    noAuth() {

    }
}
module.exports = new AuthMiddleware();
