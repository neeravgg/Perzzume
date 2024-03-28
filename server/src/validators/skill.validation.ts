import Joi from 'joi';

const addValidate = Joi.object({
    title: Joi.string().required(),
});

const getListValidate = Joi.object({
    user_id: Joi.string().required(),
    page: Joi.string(),
    pageSize: Joi.string(),
});
const updateValidate = Joi.object({
    title: Joi.string(),
    image_name: Joi.string(),
    id: Joi.string().required(),
});
const deleteValidate = Joi.object({
    id: Joi.string().required(),
});

export {
    addValidate,
    getListValidate,
    updateValidate,
    deleteValidate
}