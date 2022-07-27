const { Users, Items, Orders, OrderItem } = require('../db/models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    try {
        const body = req.body
        // console.log(body)
        const searchUser = await Users.findOne({ where: { userName: req.body.userName } })
        console.log(searchUser)
        
        // console.log(searchUser.userid)
        if (searchUser == null) {
            return res.status(201).json({
                message: 'username notfound!!'
            })
        }
        const matchPassword = bcrypt.compareSync(body.password, searchUser.password)
        // console.log(matchPassword)

        if (matchPassword) {
            // const token = jwt.sign(
            //     { userName: searchUser.userName},
            //     process.env.TOKEN_KEY,
            //     {
            //       expiresIn: "2h",
            //     }
            //   );
            // searchUser.token = token
            // console.log(searchUser.token)
            return res.status(201).json({
                message: `hello ${searchUser.name},succes login`,
            })
        } else {
            return res.status(401).json({
                message: 'incorrect password'
            })
        }
    } catch (error) {
        console.log(error)
        next(error)
    }

}


const addUser = async (req, res, next) => {
    try {
        const body = req.body

        const isUserExist = await Users.findOne({
            where: {
                userName: body.userName
            }
        })
        const isEmailExist = await Users.findOne({
            where: {
                email: body.email
            }
        })

        if (isUserExist) {
            throw {
                code: 400,
                message: 'username already exist'
            }
        } else if (isEmailExist) {
            throw {
                code: 400,
                message: 'Email already exist'
            }
        }

        const hasedPassword = bcrypt.hashSync(body.password, 12)

        const user = await Users.create({
            userName: body.userName,
            email: body.email,
            password: hasedPassword,
            name: body.name,
            phone: body.phone,
            status: body.status
        })
        console.log(body)

        return res.status(200).json({
            code: 200,
            message: 'Success create user',
            data: {
                userName: user.userName,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id)
        const body = req.body
        const hasedPassword = bcrypt.hashSync(body.password, 12)
        const newPassword = { "password": hasedPassword }
        const newBody = { ...body, ...newPassword }
        // console.log(newBody)
        await user.set({ ...user, ...newBody })
        await user.save()

        // console.log(user)
        return res.status(200).json({
            message: 'user berhasil diupdate'
        })
    } catch (error) {
        next(error)
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id)
        if (!user) {
            return res.status(200).json({
                message: 'user not found'
            })
        } else {
            user.destroy()
            return res.status(200).json({
                message: 'success remove user'
            })
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}