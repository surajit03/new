const mongoose = require('mongoose');
const { Schema } = mongoose;


const AddSchema = new Schema({
    imgUrl: {
        type:Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    IdNumber: {
        type: String,
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

const Coustomer = mongoose.model('Coustomer', AddSchema);
module.exports = Coustomer;
