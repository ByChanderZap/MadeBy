const Project = require('../../../db/models/projects');
const baseSelect = '_id title description technologies repository url user'

const addProject = (project) => {
    const saved = new Project(project);
    return saved.save();
}

const getProjectsByFilter = async (filter) => {
    const projects = await Project.find(filter, null, {sort: {
        createdAt: -1
    }}).populate('user', 'name email phone', 'User');
    return projects;
}

const getOneById = async (filter) => {
    const project = await Project.findOne(filter, baseSelect).populate('user', 'name email photo phone github_profile twitter_username', 'User');
    return project;
}

const deleteOne = async (id) => {
    return Project.findByIdAndDelete(id);
}

const update = async (id, newUpdate) => {
    return Project.findByIdAndUpdate(id, newUpdate, {new: true});
}

module.exports = {
    addProject,
    getOneById,
    deleteOne,
    update,
    getProjectsByFilter
}