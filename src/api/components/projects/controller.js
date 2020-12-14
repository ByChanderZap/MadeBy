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
    console.log(userData.sub, project.user['_id']);
    if(userData.sub != project.user['_id']) throw boom.unauthorized('You are not authorized to do that action.');

    return store.deleteOne(id);
}

module.exports = {
    saveProject,
    getOneById,
    deleteOne
}