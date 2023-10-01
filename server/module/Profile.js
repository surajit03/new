const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProfileSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
    },
    contactAddress:{
        type:String,
    }, 
    businessName:{
        type:String,
   
    },
    logo:{
        type:String,
   
    }, 
    paymentDetails:{
        type:String,
   
    },
    userId:{
        type:[String],
  
    },
    date:{
        type: Date,
        dafault: Date.now
    },

});
const Profile =mongoose.model('Profile',ProfileSchema);
module.exports = Profile;