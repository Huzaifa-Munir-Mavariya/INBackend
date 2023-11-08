const express = require("express");
const router = express.Router();
const fetchUser = require("../middlewares/fetchUser");
const Note = require("../models/Notes");
const {body, validationResult} = require("express-validator");

//Route1: Get All the Notes using: POST "/api/auth/getuser". Login Required
router.get('/fetchAllNotes', fetchUser, async (req,res) => {
    const notes = await Note.find({user:req.user.id});
    res.json(notes)
})

//Route2: Add a new no using: POST "/api/auth/addNote". Login Required
router.post('/addNote', fetchUser, async (req,res) => {
    try {
    const {title,description,tag} = req.body;
    const notes = await Note.find({user:req.user.id});

    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save();
    res.json(savedNote);
    } catch (error) {
        console.log(error);
    }
})

//Route3: Update an existing Note using: "/api/notes/updateNote". Login Requires
router.put("/updateNotes/:id",fetchUser, async (req,res)=>{
    const {title,description,tag} = req.body;
    //Create new note tag
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json(note);
});

//Route4: Delete an existing Note using: "/api/notes/updateNote". Login Requires
router.delete("/deleteNotes/:id",fetchUser, async (req,res)=>{
    const {title,description,tag} = req.body;
    //Create new note tag
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    //Allow deletion only if a user owns a note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.send("Note deleted!")
});

module.exports = router;