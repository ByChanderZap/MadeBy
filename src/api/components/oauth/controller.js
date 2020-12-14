const github = require('../../../utils/oauths/github');
const jwt = require('../../../utils/createJwt');
const boom = require('@hapi/boom');
const store = require('./store');

const step2 = async (client, secret, code, state) => {

    const accessToken = await github.getAccessToken(client, secret, code, state);
    const userData = await github.getUserData(accessToken);
    let filterEmail = {
        email: userData.email
    }
    const existsUser = await store.getUserByFilter(filterEmail);
    if (existsUser && existsUser.login_type !== 'Github') {
        throw boom.badData('You must login with the normal login form!');
    }
    if (!existsUser) {
        const bio = userData.bio.replace(/[\r]/g, " ");
        let newUser = {
            name: userData.name,
            email: userData.email,
            photo: userData.avatar_url,
            github_profile: userData.html_url,
            twitter_username: userData.twitter_username,
            bio,
            login_tipe: 'Github',
            location: userData.location,
            github_id: userData.id,
            is_verified: true,
        }

        const addedUser = await store.createUser(newUser);
        return addedUser;
    } else {
        const token = jwt.createToken(existsUser);
        return token
    }

}

module.exports = {
    step2
}