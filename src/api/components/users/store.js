const User = require('../../../db/models/users');

const createUser = async (user) => {
    const myUser = new User(user);
    return await myUser.save();
}

const getEveryUser = async() => {
    const users = await User.find();
    return users;
}

const getUserByFilter = async (filter) => {
    const user = await User.findOne(filter).exec();
    return user;
}


module.exports = {
    createUser,
    getEveryUser,
    getUserByFilter
}