import Joi from 'joi';

const addValidate = Joi.object({
    company: Joi.string().required(),
    job_title: Joi.string().required(),
    description: Joi.string().required(),
});

const getListValidate = Joi.object({
    user_id: Joi.string(),
    page: Joi.string(),
    pageSize: Joi.string(),
});
const updateValidate = Joi.object({
    company: Joi.string(),
    job_title: Joi.string(),
    description: Joi.string(),
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