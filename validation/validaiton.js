const Joi = require('joi');
const JOI = require('joi');

const loginValidationSchema = JOI.object({
    email: JOI.string().min(6).max(255).required(true).email(),
    password: JOI.string().min(6).max(255).required(true)
})

const registerValidationSchema = JOI.object({
    username: JOI.string().min(6).max(255).required(true),
    email: JOI.string().min(6).max(255).required(true).email(),
    password: JOI.string().min(6).max(255).required(true)
})

module.exports.loginValidationSchema = loginValidationSchema;
module.exports.registerValidationSchema = registerValidationSchema;