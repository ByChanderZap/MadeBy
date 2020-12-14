const store = require('./store');

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

module.exports = {
    saveProject,
    getOneById
}