const jwt = require("jsonwebtoken");

function secret(req, res, next) {
    const token = req.header('secret-token')

    if (!token) {
        return res.status(400).json({
            message: "Acces Denied"
        })
    }

    try {
        const verifikasi = jwt.verify(token, process.env.Secret_Token)
        req.user = verifikasi
        next();
    } catch (error) {
        res.status(400).json({
            message: "invalid token"
        })
    }


    
}

module.exports = secret