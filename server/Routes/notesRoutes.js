const express = require('express');
const { isAuthenticated } = require('../Middleware/auth');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../Database/Models/NotesSchema')

//ROUTE 1: Fetching all notes
Router.get("/fetchnote", isAuthenticated, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.status(200).json({ notes });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }

})


//ROUTE 2: Adding a note
Router.post("/addnote", [
    //Adding validation
    body('title', 'title is too short').isLength({ min: 3 }),
    body('desc', 'Description is too short').isLength({ min: 5 })
], isAuthenticated, async (req, res) => {
    //Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, desc, tag } = req.body;
        const note = new Note({ title, desc, tag, user: req.user.id })
        await note.save()
        res.json({ success: true, note });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})


//ROUTE 3: Updating a note
Router.put('/update/:id', [
    //Adding validation
    body('title', 'title is too short').isLength({ min: 3 }),
    body('desc', 'Description is too short').isLength({ min: 5 })
], isAuthenticated, async (req, res) => {
    //Checking for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let newNote = {};

        const { title, desc, tag } = req.body;
        if (!title || !desc) {
            return res.status(400).json({ error: "Please enter all fields" })
        }

        newNote.title = title;
        newNote.desc = desc;
        newNote.tag = tag;

        let note = await Note.find({ user: req.user, _id: req.params.id })
        if (!note) {
            return res.status(400).send("Not Found")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.status(200).json({ success: true, note });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})


//ROUTE 4: Deleting a note
Router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        let note = await Note.find({ user: req.user, _id: req.params.id })
        if (!note) {
            return req.status(400).send("Not Found")
        }
        await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, msg: "Deleted Successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
})


module.exports = Router;