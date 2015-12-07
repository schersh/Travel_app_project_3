var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")

var citiesController = {
  show: function(req, res){
    CityModel.findById(req.params.id, function(err, doc){
      res.render("cities/show", {cities: doc})
    });
  },
  addNote: function(req, res){
    CityModel.findById(req.params.id, function(err, docs){
      docs.notes.push(new NoteModel({body: req.body.body}))
      docs.save(function(err){
        if(!err){
          res.redirect("/city/" + req.params.id)
        }
      })
    })
  },


}

module.exports = citiesController;
