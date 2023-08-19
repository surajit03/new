const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Check if the actual model name is 'User'
    },
    imgUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    IdNumber: {
        type: Number,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    Email: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Customer', AddSchema);
