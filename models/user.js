const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // proverka email na ynikal'nost', mongoose bydet proverjat est' li takoj email
    unique: true,
    match: emailRegexp,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  token: {
    type: String,
    default: ""
  }
}, { versionKey: false, timestamps: true });

// esli validacija ne projdena vudaem oshubky
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
})

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model("user", userSchema);

module.exports = { schemas, User }