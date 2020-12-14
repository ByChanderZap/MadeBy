const Project = require('../../../db/models/projects');
const baseSelect = '_id title description technologies repository url user'

const addProject = (project) => {
    const saved = new Project(project);
    return saved.save();
}

const getOneById = async (filter) => {
    const project = await Project.findOne(filter, baseSelect).populate('user', 'name email photo phone github_profile twitter_username', 'User');
    return project;
}

module.exports = {
    addProject,
    getOneById
}