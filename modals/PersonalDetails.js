const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalDetails = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    fullname:{
        type:String
    },
    number:{
        type:Number
    },
    altNumber:{
     type:Number
    },
    email:{
     type:String
    },
    address:{
        type:String
    }
});

module.exports = mongoose.model('personalDetails', personalDetails )