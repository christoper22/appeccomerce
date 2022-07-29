const { Users, Items, Orders, OrderItem, Roles } = require('../../db/models/index')

const register = async(req,res,next) => {
    try {
        const body = req.body
        const isRolesExist = await Roles.findOne({where: { name:body.role}})
        const isUserExist = await Users.findOne({where: {userName: body.userName}})
        const isEmailExist = await Users.findOne({where: {email: body.email}})
        if (!isRolesExist) {
            throw {
                code: 400,
                message: 'roles not found'
            }
        }else if (isUserExist) {
                throw {
                    code: 400,
                    message: 'username already exist'
                }
        } else if (isEmailExist) {
                throw {
                    code: 400,
                    message: 'Email already exist'
                }
        }else{next()}
    } catch (error) {
        next(error)
    }
}



module.exports = register