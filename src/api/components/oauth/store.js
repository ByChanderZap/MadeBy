const User = require('../../../db/models/users');

const createUser = async (user) => {
    const myUser = new User(user);
    return await myUser.save();
}

const getUserByFilter = async (filter) => {
    const user = await User.findOne(filter).exec();
    return user;
}

module.exports = {
    createUser,
    getUserByFilter
}