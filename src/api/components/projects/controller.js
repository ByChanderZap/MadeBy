const store = require('./store');
const boom = require('@hapi/boom');


const getOneById = async (id) => {
    const filter = {
        _id: id
    }
    const pro = await store.getOneById(filter);
    return pro;
}

const saveProject = (title, description, technologies, rol, repository, url, userData) => {
    let project = {
        title,
        description,
        technologies,
        rol,
        repository,
        url,
        user: userData.sub
    }
    return store.addProject(project);
}

const deleteOne = async (id, userData) => {
    const project = await store.getOneById({_id: id});
    if(!project) throw boom.badData('Cannot find a project with that id');
    if(userData.sub != project.user['_id']) throw boom.unauthorized('You are not authorized to do that action.');
    return store.deleteOne(id);
}

const updateProject = async (id, title, description, technologies, rol, repository, url, userData) => {
    const project = await store.getOneById({_id: id});
    if(!project) throw boom.badData('Cannot find a project with that id');
    if(userData.sub != project.user['_id']) throw boom.unauthorized('You are not authorized to do that action.');
    let update = {
        id,
        title,
        description,
        technologies,
        rol,
        repository,
        url,
    }
    for(let prop in update) {
        if(!update[prop]) delete update[prop];
    }
    return await store.update(id, update);
}

const getProjectsOf = async (id) => {
    let filter = {
        user: id
    }
    return await store.getProjectsByFilter(filter);
}

module.exports = {
    saveProject,
    getOneById,
    deleteOne,
    updateProject,
    getProjectsOf
}