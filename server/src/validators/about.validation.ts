import Joi from 'joi';

const addValidate = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
});

const getListValidate = Joi.object({
    user_id: Joi.string().required(),
});
const updateValidate = Joi.object({
    name: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    image_name: Joi.string(),
});

export {
    addValidate,
    getListValidate,
    updateValidate,

}