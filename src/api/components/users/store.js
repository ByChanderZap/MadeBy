const User = require('../../../db/models/users');

const createUser = async (user) => {
    const myUser = new User(user);
    return myUser.save();
}

const getEveryUser = async() => {
    const users = await User.find();
    return users;
}

const getUserByFilter = async (filter) => {
    const user = await User.findOne(filter).exec();
    return user;
}

const getOneById = async (id) => {
    return await User.findById(id);
}

const deleteUser = async (id) => {
    const deleted = await User.findByIdAndDelete(id);
    return deleted;
}

module.exports = {
    getOneById,
    createUser,
    getEveryUser,
    getOneByFilter: getUserByFilter,
    deleteUser
}