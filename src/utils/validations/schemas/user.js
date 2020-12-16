const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = joi.string().max(80).regex(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/).message('That doesnt looks like a name, if you think its an error please contact with an administrator.');
const emailSchema = joi.string().max(80).regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).message('That doesnt looks like a valid email');
const passwordSchema = joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).message('Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
const photoSchema = joi.any();
const github_profileSchema = joi.string().uri().message('Github profile must be a valid link to your profile!');
const twitter_usernameSchema = joi.string().min(2).max(80);
const bioSchema = joi.string().min(5).max(220);
const locationSchema = joi.string().min(5).max(60);
const phoneSchema = joi.string().min(8).max(20).regex(/^\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})$/).message('Invalid phone format.')

const createUserSchema = {
    name: name.required(),
    email: emailSchema.required(),
    photo: photoSchema,
    phone: phoneSchema,
    password: passwordSchema.required(),
    github_profile: github_profileSchema,
    twitter_username: twitter_usernameSchema,
    bio: bioSchema,
    location: locationSchema,
};

const updateUserSchema = {
    name: name,
    email: emailSchema,
    photo: photoSchema,
    phone: phoneSchema,
    password: passwordSchema,
    github_profile: github_profileSchema,
    twitter_username: twitter_usernameSchema,
    bio: bioSchema,
    location: locationSchema,
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