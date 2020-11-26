const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    photo: String,
    password: String,
    github_profile: String,
    twitter_username: String,
    bio: String,
    login_tipe: String,
    location: String,
    github_id: String,
    is_verified: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type:Boolean,
        default: false
    }
},{
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;