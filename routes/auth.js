const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {body,validationResult} = require("express-validator");
const fetchUser = require("../middlewares/fetchUser");

JWT_SECRET = "Huzaifa$goodboy"
//Create a user using Post
router.get('/',(req,res) => {
    console.log(req.body)
    res.send("Hello");
})

//Handle CreateUser request - no Login required
router.post('/createUser', async (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let success = false;
    
    if(password.length < 5){
        console.log("Password should be bigger that 5 characters")
        res.json(success,'Data has not been added');
    }
    else if(name.length < 3){
        console.log("Name should be bigger than 3 characters");
        res.json(success,'Data has not been added');
    }
    else{
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password,salt);
        //Create a new user
             const user = await User.create({
                name:name,
                email:email,
                password:securePassword
            });

            const data = {
                user:{
                    id:user.id
                }
            }
            success=true
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({success,authToken});

            const addData = await user.save();
            
        }
});

router.post("/login",async (req,res) => {
    let success = false;
    const email1 = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({email:email1});
        const realpassword = await bcrypt.compare(password,user.password);
       const data={
        user:{
            id:user.id
        }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
        if(realpassword){
            console.log("You are logged in");
            success=true
            res.json({success, authToken});
        }
        else{
            success=false
            console.log("Invalid Credentials");
            res.json("Invalid Credentials")
            
        }
    }
    catch(e){
        console.log(e);
    }
})
// Route 3: Get Logged in users Details using: post "api/auth/getUser". login required
router.post("/getUser",fetchUser, async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.log(e);
    }
})
module.exports = router;