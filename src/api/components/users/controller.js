// eslint-disable-next-line no-unused-vars
const store = require('./store');
const upload = require('../../../utils/sendToS3');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const boom = require("@hapi/boom");

const getEveryUser = async () => {
    const users = await store.getEveryUser();
    return users;
}

const getOneUser = async (id) => {
    return await store.getOneById(id);
}


const createUser = async (name, email, password, github_profile, twitter_username, bio, location, file) => {
    const exists = await store.getOneByFilter({email: email});
    if(exists) throw boom.badData('Already exists an user with that email.');
    let imgUrl;
    let newUser = {
        name,
        email,
        github_profile,
        twitter_username,
        bio,
        location,
    }
    if(file) {
        imgUrl = await upload(file);
        newUser.photo = imgUrl.Location
    }

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) reject(boom.internal(err));
            resolve(hash);
        })
    })
    newUser.password = hashedPassword;
    return store.createUser(newUser);
}

const deleteUser = async (id) => {
    await store.deleteUser(id);
    return
}

module.exports = {
    create: createUser,
    getEveryUser,
    deleteUser,
    getOneUser
}