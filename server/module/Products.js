const mongoose=require('mongoose')
const{ Schema} =mongoose

const ProSchema = new Schema({
    imgUrl: {
        type:Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    categary: {
        type: String,
        required: true
    },
    uniqueId:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const Product = mongoose.model('Product', ProSchema);
module.exports =Product; 