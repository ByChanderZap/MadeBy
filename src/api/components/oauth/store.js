const User = require('../../../db/models/users');

const createUser = async (user) => {
    const myUser = new User(user);
    return await myUser.save();
}

const getUserByFilter = async (filter) => {
    const user = await User.findOne(filter).exec();
    return user;
}

const getEveryUser = async() => {
    const users = await User.find();
    return users;
}

module.exports = {
    createUser,
    getEveryUser,
    getUserByFilter
}