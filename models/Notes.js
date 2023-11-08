const mongoose = require("mongoose");
const connectToMongoose = require("../db");

const NotesSchema  = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    }
    
})

const Notes = mongoose.model("Note", NotesSchema);

module.exports = Notes;
