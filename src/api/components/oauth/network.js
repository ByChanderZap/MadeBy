const express = require('express');
const router = express.Router();
const { config } = require('../../../config/index');
const controller = require('./controller');
const generateRandomString = require('../../../utils/oauths/general');

//  http://localhost:3000/api/auth/github
router.get('/github', (req, res) => {
    const random = generateRandomString(24);
    const uri = `https://github.com/login/oauth/authorize?client_id=${config.github_client_id}&scope=user&state=${random}`
    res.redirect(uri);
})

router.get('/github/callback', async (req, res, next) => {
    
    const { code, state } = req.query;
    const { github_client_id, github_client_secret } = config;

    try {
        const data = await controller.step2(github_client_id, github_client_secret, code, state);
        res.status(200).json({
            Message: "Login success",
            data
        })
    } catch (error) {
        next(error)
    } 
})

module.exports = router;