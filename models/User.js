const mongoose = require("mongoose");
const connectToMongoose = require("../db");

const Schema  = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
    
})

const User = mongoose.model("User", Schema);
//User.createIndexes();
module.exports = User;