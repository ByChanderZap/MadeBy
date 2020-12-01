const User = require('../../../db/models/users');
const baseSelect = 'name email photo github_profile twitter_username bio location is_admin login_type';

const createUser = async (user) => {
    const myUser = new User(user);
    return myUser.save();
}

const getEveryUser = async() => {
    const users = await User.find({}, baseSelect)
    return users;
}

const getUserByFilter = async (filter) => {
    const user = await User.findOne(filter, `${baseSelect} password`).exec();
    return user;
}

const getOneById = async (id) => {
    return await User.findById(id, baseSelect);
}

const updateUser = async (id, act) => {
    return User.findByIdAndUpdate(id, act, {new: true});
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
    deleteUser,
    updateUser
}