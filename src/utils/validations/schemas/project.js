const joi = require('joi');

const projectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid id');
const titleSchema = joi.string().min(5).max(100);
const descriptionSchema = joi.string().min(10).max(255);
const technologiesSchema = joi.array().items(joi.string());
const rolSchema = joi.string().min(3).max(50);
const repositorySchema = joi.string().uri();
const urlSchema = joi.string().uri();

const createProjectSchema = {
    title: titleSchema.required(),
    description: descriptionSchema.required(),
    technologies: technologiesSchema.required(),
    rol: rolSchema.required(),
    repository: repositorySchema,
    url: urlSchema,
}

const editProjectSchema = {
    title: titleSchema,
    description: descriptionSchema,
    technologies: technologiesSchema,
    rol: rolSchema,
    repository: repositorySchema,
}

module.exports = {
    projectIdSchema,
    createProjectSchema,
    editProjectSchema
}