const Joi = require("joi");

const addUpdateOrderSchema = Joi.object({
    status: Joi.string().required(),
    item: Joi.array().items(Joi.object({
    name: Joi.string().required(),
    totalItem: Joi.number().required(),
})
)
    
})
    
module.exports = addUpdateOrderSchema