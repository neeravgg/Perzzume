import Joi from 'joi';

const loginValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const registerValidate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export {
    loginValidate,
    registerValidate
}