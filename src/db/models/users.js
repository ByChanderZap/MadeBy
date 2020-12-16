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
    phone: {
        type: String,
        default: ''
    },
    github_profile: {
        type: String,
        default: ''
    },
    twitter_username: String,
    bio: String,
    login_type: {
        type: String,
        default: "Local"
    },
    location: {
        type: String,
        default: ''
    },
    github_id: String,
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