const userRoutes = require('../components/users/network');
const authRoutes = require('../components/oauth/network');

const routes = (app) => {
    app.use('/api/user/', userRoutes);
    app.use('/api/oauth/', authRoutes);
}

module.exports = routes;