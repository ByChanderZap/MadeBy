const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true, maxlength: 220 },
    email: {
        unique: true,
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    photo: String,
    password: String,
    github_profile: String,
    twitter_username: String,
    bio: String,
    login_tipe: {
        type: String,
        default: "Local"
    },
    location: String,
    github_id: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
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