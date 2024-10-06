const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartDetails = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String
    },
    price:{
        type:String
    },
    original_price:{
     type:String,
    },
    star_rating:{
        type:Number
    },
    num_rating:{
        type:Number
    },
    photo:{
        type:String
    }
});

module.exports = mongoose.model('cartdetails', CartDetails )