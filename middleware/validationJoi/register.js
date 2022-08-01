const Joi = require("joi");

const registerUpdateSchema = Joi.object({
    userName: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
    role: Joi.string().required(),
})

module.exports = registerUpdateSchema