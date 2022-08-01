const Joi = require("joi");

const addItemSchema = Joi.array().items(Joi.object({
    name: Joi.string().required(),
    codes: Joi.string().required(),
    price: Joi.number().required(),
    totalItems: Joi.number().required(),
})
)
module.exports = addItemSchema