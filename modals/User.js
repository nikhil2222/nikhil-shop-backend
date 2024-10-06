const mongoose = require('mongoose');
const { Schema } = mongoose;

const userDetails = new Schema({
    name:{
        type:String
    },
    number:{
        type:Number,
        unique:true
    },
    email:{
     type:String,
     unique:true
    },
    password:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userDetails )