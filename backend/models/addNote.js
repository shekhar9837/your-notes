const mongoose = require('mongoose')

const addNoteSchema = new mongoose.Schema({
    title:{type: 'string', required: true},
    content: {type: 'string', required:true},
    tags: {type: [String], default: []},
    isPinned: {type: 'boolean', required:false},
    userId: {type: 'string', required:true},
    createdOn: {type: Date, default: new Date().getTime()}



})

module.exports = mongoose.model("UserNotes", addNoteSchema )