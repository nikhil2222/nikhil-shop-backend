const mongoose = require('mongoose')
const MongooUrl = 'mongodb+srv://nikhilproject:Nikhil%40220900@cluster0.wqi7ciu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectToMongooDB = ()=>{
    if(mongoose.connect(MongooUrl)){
        console.log("SuccessFully Connected to MongooDB")
    }
    else{
        console.log('Some Error Occured')
    }
}
module.exports = connectToMongooDB;