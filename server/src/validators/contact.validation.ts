import Joi from 'joi';

const addValidate = Joi.object({
    email: Joi.string().required(),
    message: Joi.string().required(),
    name: Joi.string().required(),
    user_id: Joi.string().required(),
});

const getListValidate = Joi.object({
    page: Joi.string(),
    pageSize: Joi.string(),
});

const deleteValidate = Joi.object({
    id: Joi.string().required(),
});

export {
    addValidate,
    getListValidate,
    deleteValidate
}