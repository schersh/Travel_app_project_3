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
    currentUser.local.cities.push(
    newCity = new CityModel({name: req.body.body}))
    currentUser.save(function(err){
      if(!err){
        console.log("Saved");
      } else {
        console.log(err);
      }
    });
    newCity.save(function(err){
      if (!err){
        res.redirect("/user/" + currentUser._id)
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
    CityModel.findById(req.params.city_id, function(err, docs){
      docs.notes.push(new NoteModel({body: req.body.body}))
      docs.save(function(err){
        if(!err){
          res.redirect("/city/" + req.params.city_id)
        }
      })
    })
  },
  removeNote: function(req, res){
    CityModel.findByIdAndUpdate(req.params.city_id, {
      $pull:{
        notes: {_id: req.params.id}
      }
    }, function(err, docs){
      if(!err){
        res.redirect("/city/" + req.params.city_id)
      }
    })
  }
}

module.exports = citiesController;
