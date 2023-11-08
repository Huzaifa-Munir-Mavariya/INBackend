const mongoose = require("mongoose");

const URL = process.env.DATABASE;

const connect = mongoose.connect(URL, {
    
}).then(()=>console.log("Connected to the database"))
.catch((e)=>console.log("Connection Failed"));


module.exports = connect;