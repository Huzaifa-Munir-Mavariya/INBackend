const mongoose = require("mongoose");
const URI = "mongodb+srv://Huzaifa:Afiazuh2006@forum.sn1gxse.mongodb.net/";


const connect = mongoose.connect(URI, {
    
}).then(()=>console.log("Connected to the database"))
.catch((e)=>console.log("Connection Failed"));


module.exports = connect;