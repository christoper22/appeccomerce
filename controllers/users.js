require('dotenv').config()
const { Users, Roles, Orders, OrderItem, Items } = require('../db/models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
    try {
        const body = req.body
        // console.log(body)
        const searchUser = await Users.findOne({ where: { userName: req.body.userName }, include: [{ model: Roles, as: "role", attributes: ['name'] }] })
        // console.log(searchUser)

        // console.log(searchUser.userid)
        if (searchUser == null) {
            return res.status(401).json({
                message: 'username notfound!!'
            })
        }
        // console.log(searchUser)
        const matchPassword = bcrypt.compareSync(body.password, searchUser.password)
        // console.log(matchPassword)

        if (matchPassword === true) {
            const token = jwt.sign(
                { userName: searchUser.userName },
                process.env.Secret_Token,
                // {
                //   expiresIn: "2h",
                // }
            );

            // console.log(token)
            return res.header('secret-token', token).status(201).json({
                message: `hello ${searchUser.name},succes login`,
                data: {
                    userName: searchUser.userName,
                    email: searchUser.email,
                    phone: searchUser.phone,
                    role: searchUser.role.name,
                    token: token
                }
            })
        } else {
            return res.status(401).json({
                message: 'incorrect password'
            })
        }
    } catch (error) {
        // console.log(error)
        next(error)
    }

}


const addUser = async (req, res, next) => {
    try {
        const body = req.body
        const role = await Roles.findOne({ where: { name: body.role } })
        // const isUserExist = await Users.findOne({
        //     where: {
        //         userName: body.userName
        //     }
        // })
        // const isEmailExist = await Users.findOne({
        //     where: {
        //         email: body.email
        //     }
        // })

        // if (isUserExist) {
        //     throw {
        //         code: 400,
        //         message: 'username already exist'
        //     }
        // } else if (isEmailExist) {
        //     throw {
        //         code: 400,
        //         message: 'Email already exist'
        //     }
        // }

        const hasedPassword = bcrypt.hashSync(body.password, 12)

        const user = await Users.create({
            userName: body.userName,
            email: body.email,
            password: hasedPassword,
            name: body.name,
            phone: body.phone,
            roleId: role.id
        })
        // console.log(body)

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
        // console.log(error)
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.userAfterVerifikation)

        // if (!user) {
        //     return res.status(400).json({
        //         message: 'user not found'
        //     })
        // } else {
        const body = req.body
        const role = await Roles.findOne({ where: { name: body.role } })
        const hasedPassword = bcrypt.hashSync(body.password, 12)
        const newBody = { ...body, password: hasedPassword, roleId: role.id }
        // console.log(newBody)
        await user.set({ ...user, ...newBody })
        await user.save()

        // console.log(user)
        return res.status(200).json({
            message: 'user berhasil diupdate',
            data: {
                username: user.userName,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: role.name
            }
        })
        // }
    } catch (error) {
        next(error)
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.userAfterVerifikation)
        // if (!user) {
        //     return res.status(400).json({
        //         message: 'user not found'
        //     })
        // } else {
        const findOrders = await Orders.findAll({ where: { userId: user.id, status: "PENDING" } })
        for (let order of findOrders) {
            const orderItemDelete = await OrderItem.findAll({ where: { orderId: order.id } })
            for (let orderItem of orderItemDelete) {
                const item = await Items.findOne({ where: { id: orderItem.itemId } })
                const updateTotalItem = (item.totalItems + orderItem.totalItem)
                // console.log(updateTotalItem)
                // console.log(typeof (item.totalItems))
                // console.log(typeof (orderItem.totalItem))
                item.update({ totalItems: updateTotalItem })
                orderItem.destroy()
            }
            order.destroy()
        }
        user.destroy()
        return res.status(200).json({
            message: 'success remove user'
        })
        // }

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