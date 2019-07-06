const UserModel = require('../../Models/UserModel');

class UserConreoller {
    constructor() {
        this.userModel = UserModel;
    }
    async getProfile ({req, res, next}) {
        const user = req.user;
        
        const isUser = await this.userModel.query()
            .select('id', 'name', 'username', 'created_at', 'updated_at')
            .where('id', user.id)
            .first();
        if(!isUser) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'something wrong get profile'
            })
        }
        return res.status(200).json({
            code: 0,
            data: isUser,
            message: 'get profile user login succsess'
        })
    }

    async updateProfile({req, res, next}) {
        const user = req.user;
        const {body} = req;

        const dataUpdate = {
            name: body.newName,
            updated_at: new Date()
        }
        
        const isUser = await this.userModel.query().update(dataUpdate).where('id', user.id);
        
        if(!isUser) {
            return res.status(400).json({
                code: 1,
                data: null,
                message: 'something wrong get profile'
            })
        }


        return res.status(200).json({
            code: 0,
            data: dataUpdate,
            message: 'update profile user login succsess'
        })
    }
}

module.exports = new UserConreoller();
