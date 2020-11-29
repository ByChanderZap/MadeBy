const express = require('express');
const router = express.Router();
const { createUserSchema, userIdSchema, updateUserSchema } = require('../../../utils/validations/schemas/user'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const upload = require('../../../utils/middlewares/uploadImage');
const controller = require('./controller');

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({
            Message: "Hello!"
        });
    } catch (error) {
        next(error);
    }
})

//  Example of req.body validation
router.post('/signup', upload, validationHandler(createUserSchema), (req, res, next) => {
    const { file } = req;

    const { name, email, password, github_profile, twitter_username, bio, location } = req.body;
    
    const data = controller.create(name, email, password, github_profile, twitter_username, bio, location, file)
    try {
        res.status(200).json({
            data
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;