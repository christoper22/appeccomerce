const { Users } = require('../../db/models/index')
const jwt = require("jsonwebtoken");

async function secret(req, res, next) {
    const token = req.header('secret-token')

    if (!token) {
        return res.status(400).json({
            message: "Acces Denied"
        })
    }

    try {
        const verifikasi = jwt.verify(token, process.env.Secret_Token)
        // console.log(verifikasi)
        // console.log(verifikasi.userName)
        const user = await Users.findOne({ where: { userName: verifikasi.userName } })
        if (!user) {
            return res.status(401).json({
                message: 'username notfound!!'
            })
        } else {
            next();
        }
    } catch (error) {
        res.status(400).json({
            message: "invalid token"
        })
    }


    
}

module.exports = secret