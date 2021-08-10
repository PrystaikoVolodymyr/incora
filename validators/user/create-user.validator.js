const Joi = require('joi');
const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    first_name: Joi
        .string()
        .alphanum(),
    last_name: Joi
        .string()
        .alphanum(),
    email: Joi
        .string()
        .regex(regexpEnum.EMAIL_REGEXP),
    phone: Joi
        .string()
        .regex(regexpEnum.PHONE_REGEXP),
    password: Joi
        .string()
        .regex(regexpEnum.PASSWORD_REGEXP)
});
