const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string(),
})

module.exports = { addSchema };