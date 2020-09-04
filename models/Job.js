const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        text: true,
    },
    company: {
        type: String,
        required: true,
        text: true,
    },
    location: {
        type: String,
        required: true,
        text: true,
    },
    description: {
        type: String,
        text: true,
    },
    link: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    dislikes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Job = mongoose.model('job', JobSchema);
