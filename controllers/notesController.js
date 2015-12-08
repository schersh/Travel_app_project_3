var NoteModel = require("../models/note");
var CityModel = require("../models/city");

var notesController = { //confirm about index
  index: function(req, res){
    NoteModel.find({}, function(err, docs){
      res.render("notes/index", {notes: docs})
    });
  },
  new: function(req, res){
    res.render("notes/new")
  },
  create: function(req, res){
    var note = new NoteModel({title: req.body.title})
    note.save(function(err){
      if (!err){
        res.redirect("notes")
      }
    })
  },
  show: function(req, res){
    NoteModel.findById(req.params.id, function(err, doc){
      res.render("notes/show", {note: doc});
    })
  },
  edit: function(req, res){
    NoteModel.findById(req.params.id, function(err, doc){
      res.render("notes/edit", {note: doc})
    })
  },

  update: function(req, res){
    NoteModel.findById(req.params.id, function(err, docs){
      docs.title = req.body.title
      docs.save(function(err){
        if(!err){
          res.redirect("/notes/" + req.params.id)
        }
      })
    })
  },
    delete: function(req, res){
      NoteModel.remove({_id: req.params.id}, function(err){
        if(!err){
          res.redirect("/notes")
        }
      })
    },
}

module.exports = notesController;
