const store = require('./store');
const upload = require('../../../utils/sendToS3');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const boom = require("@hapi/boom");
const jwt = require("../../../utils/createJwt");

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

const login = async (email, password) => {
    const user = await store.getOneByFilter({email: email});
    if (!user) throw boom.badData('Email or password incorrect');
    if (user.login_type !== 'Local') throw boom.illegal(`Your have to login with ${user.login_type} for more information contact with support team 😊`);

    const passCorrect = await bcrypt.compare(password, user.password).catch(e => { throw boom.internal(e) })
    if(!passCorrect) throw boom.badData('Email or password incorrect');

    const token = jwt.createToken(user);
    return token;
}

const update = async (id, name, email, password, github_profile, twitter_username, bio, location, file, userDecoded) => {
    if(userDecoded.sub != id && !userDecoded.is_admin) throw boom.unauthorized('You dont have the permisions to do that.');
    let imgUrl;
    let update = {
        name,
        email,
        github_profile,
        twitter_username,
        bio,
        location,
    }
    if(password) {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) reject(boom.internal(err));
                resolve(hash);
            })
        })
        update.password = hashedPassword;
    }
    if(file) {
        imgUrl = await upload(file);
        update.photo = imgUrl.Location
    }
    
    return store.updateUser(id, update);
}

const deleteUser = async (id) => {
    return await store.deleteUser(id);
}

module.exports = {
    create: createUser,
    getEveryUser,
    deleteUser,
    getOneUser,
    login,
    update
}