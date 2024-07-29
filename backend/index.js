require('dotenv').config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const User = require("./models/user");
const UserNotes = require("./models/addNote");
const authMiddleware = require("./authMiddleware");
const jwt = require("jsonwebtoken");
const db_url = process.env.DB_URL;
mongoose.connect(db_url)

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({ error: true, message: "Please provide a full name" });
    }
    if (!email) {
        return res.status(400).json({ error: true, message: "Please provide an email" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Please provide a password" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: true, message: "User already exists" });
    }

    const user = new User({ fullName, email, password });
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "36000m" });

    return res.json({
        error: false,
        user,
        message: "Account created successfully",
        accessToken
    });
});


app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Please provide an email" });
    }
    if (!password) {
        return res.status(400).json({ error: true, message: "Please provide a password" });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
        return res.status(401).json({ error: true, message: "User not found" });
    }

    if (userExists.password === password) {
        const user = { user: userExists };
        const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "36000m" });

        return res.json({
            error: false,
            email,
            message: "Logged in successfully",
            accessToken
        });
    } else {
        return res.status(401).json({ error: true, message: "Invalid credentials" });
    }
});

app.post("/add-note", authMiddleware, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Please enter a title" });
    }

    try {
        const note = new UserNotes({
            title,
            content,
            tags: tags || [],
            userId: user._id
        });
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note successfully created"
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: "Internal Server Error"
        });
    }
});

app.put("/edit-note/:noteId",authMiddleware, async function (req, res) {
        const noteId = req.params.noteId;
        const { title, content, tags, isPinned } = req.body;
        const {user} = req.user;

        if(!title && !content && !tags) {
            return res.json({ error: true, message:"no changes provided" });
        }

        try{
          const note = await UserNotes.findOne({ _id: noteId, userId: user._id})

          if(!note) {
            return res.json({ error: true, message: "Note not found" });
          }

          if(title) note.title = title;
          if(content) note.content = content;
          if(tags) note.tags = tags;
          if(isPinned) note.isPinned = isPinned;

          await note.save();

          return res.json({ error: false, message: "Note updated successfully", note });
        }catch(err){
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }

})

app.get("/get-all-notes",authMiddleware, async  function(req, res){
        const {user} = req.user;

        try{
            const notes = await UserNotes.find({ userId: user._id }).sort({ updatedAt: -1 });
            return res.json({ error: false, notes, message: "All notes retrieved successfully"});
        }catch(err){
            return res.status(500).json({ error: true, message: "Internal Server Error" });
        }
})

app.delete("/delete-note/:noteId", authMiddleware, async function(req, res){
    const noteId = req.params.noteId;        
    const {user} = req.user;

    try{
        const note = await UserNotes.findOneAndDelete({ _id: noteId, userId: user._id});

        if(!note){
            return res.json({ error: true, message: "Note not found" });
        }

        await UserNotes.deleteOne({
            _id: noteId,
            userId: user._id
        })

        return res.json({ error: false, message: "Note deleted successfully" });
    }catch(err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }

})

app.put("update-note-pinned/:noteId", async (req, res) => {
    const noteId  = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;


    try{
        const note =await UserNotes.findOne({_id:noteId, userId:user._id})

        if(!note){
            return res.json({ error: true, message: "Note not found" });
        }

        if(isPinned) note.isPinned = isPinned;

        await note.save();
        return res.json({ error: false, message: "Note updated successfully", note });
    }catch(err){
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
})




app.listen(8000, () => {
    console.log('Server running on port 8000');
});

module.exports = app;
