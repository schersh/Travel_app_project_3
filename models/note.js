require("../db/schema")
var mongoose = require('mongoose')

var NoteModel = mongoose.model("Note")

module.exports = NoteModel
