var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")

var citiesController = {
  show: function(req, res){
    console.log('////');
    console.log('req.params: ', req.params);
    console.log('////');
    CityModel.findById(req.params.id, function(err, doc){
      console.log('////');
      console.log('err: ', err);
      console.log('////');

      console.log('////');
      console.log('doc: ', doc);
      console.log('////');
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
  }
}

module.exports = citiesController;
