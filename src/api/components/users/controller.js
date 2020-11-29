// eslint-disable-next-line no-unused-vars
const store = require('./store');
const upload = require('../../../utils/sendToS3');

const createUser = async (name, email, password, github_profile, twitter_username, bio, location, file) => {
    let imgUrl;
    if(file) {
        imgUrl = await upload(file);
        console.log(imgUrl)
    }
    const newUser = {
        name,
        email,
        password,
        photo: imgUrl.Location,
        github_profile,
        twitter_username,
        bio,
        location,
        file: file.originalname
    }
    console.log(newUser);
    return newUser;
}

module.exports = {
    create: createUser
}