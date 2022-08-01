const Joi = require("joi");

const updateItemSchema = Joi.object({
    name: Joi.string().required(),
    codes: Joi.string().required(),
    price: Joi.number().required(),
    totalItems: Joi.number().required(),
})

module.exports = updateItemSchema