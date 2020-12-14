const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    technologies: [{
        type: String,
        required: true
    }],
    rol: {
        type: String,
        required: true
    },
    repository: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
})

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;