const Joi = require("joi");

const loginSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(8).required(),
})

module.exports = loginSchema