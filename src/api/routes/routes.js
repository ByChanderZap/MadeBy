const userRoutes = require('../components/users/network');
const authRoutes = require('../components/oauth/network');
const projectRoutes = require('../components/projects/network');

const routes = (app) => {
    app.use('/api/user/', userRoutes);
    app.use('/api/oauth/', authRoutes);
    app.use('/api/project/', projectRoutes);
}

module.exports = routes;