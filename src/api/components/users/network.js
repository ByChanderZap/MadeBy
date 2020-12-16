const express = require('express');
const router = express.Router();
const { createUserSchema, userIdSchema, updateUserSchema, loginSchema } = require('../../../utils/validations/schemas/user'); // eslint-disable-line
const validationHandler = require('../../../utils/middlewares/validationHandler');
const upload = require('../../../utils/middlewares/uploadImage');
const controller = require('./controller');
const checkjwt = require('../../../utils/middlewares/auth/checkJwt');

router.get('/', async (_, res, next) => {
    try {
        const users = await controller.getEveryUser();
        res.status(200).json({
            Message: "Here are every user :)",
            users
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id', validationHandler({ id: userIdSchema }, "params"), async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await controller.getOneUser(id);
        res.status(200).json({
            Message: "Success",
            user
        });
    } catch (error) {
        next(error);
    }
})

router.post('/signup', upload, validationHandler(createUserSchema), async (req, res, next) => {
    const { file } = req;

    const { name, email, password, github_profile, twitter_username, bio, location, phone } = req.body;

    try {
        await controller.create(name, email, password, github_profile, twitter_username, bio, location, file, phone);
        res.status(201).json({
            Message: "User created successfully!"
        })
    } catch (error) {
        next(error);
    }
})

router.post('/login', validationHandler(loginSchema), async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const token = await controller.login(email, password);
        res.status(200).json({
            Message: "Welcome :)",
            token
        })
    } catch (error) {
        next(error);
    }
})

router.put('/:id', upload, validationHandler(updateUserSchema), checkjwt, async (req, res, next) => {
    const { file } = req;
    const { id } = req.params;
    const { name, email, password, github_profile, twitter_username, bio, location, phone } = req.body;
    const { userData } = req;

    try {
        await controller.update(id, name, email, password, github_profile, twitter_username, bio, location, file, userData, phone);

        res.status(200).json({
            Message: "User updated successfully",
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validationHandler({ id: userIdSchema }, "params"), checkjwt, async (req, res, next) => {
    const { id } = req.params;
    try {
        await controller.deleteUser(id, req.userData);
        res.status(200).json({
            Message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
})


module.exports = router;