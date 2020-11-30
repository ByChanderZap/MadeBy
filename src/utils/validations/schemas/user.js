const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a name, if you think its an error please contact with an administrator.');
const emailSchema = joi.string().max(80).regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).message('That doesnt looks like a valid email');
const passwordSchema = joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).message('Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number');
const photoSchema = joi.any();
const github_profileSchema = joi.string().uri().message('Github profile must be a valid link to your profile!');
const twitter_usernameSchema = joi.string().min(2).max(80);
const bioSchema = joi.string().min(5).max(220);
const locationSchema = joi.string().min(5).max(60);


const createUserSchema = {
    name: name.required(),
    email: emailSchema.required(),
    photo: photoSchema,
    password: passwordSchema.required(),
    github_profile: github_profileSchema,
    twitter_username: twitter_usernameSchema,
    bio: bioSchema.required(),
    location: locationSchema.required(),
};

const updateUserSchema = {
    name: name.required(),
    email: emailSchema.required(),
    photo: photoSchema,
    password: passwordSchema.required(),
    github_profile: github_profileSchema,
    twitter_username: twitter_usernameSchema,
    bio: bioSchema.required(),
    location: locationSchema.required(),
}

const loginSchema = {
    email: emailSchema,
    password: passwordSchema
}

module.exports = {
    userIdSchema, 
    createUserSchema,
    updateUserSchema,
    loginSchema
};