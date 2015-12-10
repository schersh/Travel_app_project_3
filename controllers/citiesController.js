var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")

var citiesController = {
  show: function(req, res){
    CityModel.findById(req.params.id, function(err, doc){
      res.render("cities/show", {cities: doc})
    });
  },
  new: function(req, res){
    res.render("cities/new")
  },
  create: function(req, res){
    var currentUser = req.user.local; 
    currentUser.local.cities.push(
    newCity = new CityModel({name: req.body.name}))
    currentUser.save(function(err){
      if(!err){
        console.log("Saved");
      } else {
        console.log(err);
      }
    });
    newCity.save(function(err){
      if (!err){
        res.redirect("/user/" + req.params.id)
      }
    });
  },
  edit: function(req, res){
    CityModel.findById(req.params.id, function(err, doc){
      res.render("cities/edit", {city: doc})
    })
  },
  update: function(req,res){
    CityModel.findById(req.params.id, function(err, docs){
      docs.name = req.body.name
      docs.save(function(err){
        if(!err){
          res.redirect("/cities/" + req.params.id)
        }
      })
    })
  },
  delete: function(req, res){
    CityModel.remove({_id: req.params.id}, function(err){
      if(!err){
        res.redirect("/cities")
      }
    })
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
