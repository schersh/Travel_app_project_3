var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")

var usersController = {
  show: function(req, res){
    UserModel.findById(req.params.id, function(err, docs){
      console.log(docs)
      console.log(err)
      res.render("users/show", {user: docs})
    });
  },
  addCity: function(req, res){
    UserModel.findById(req.params.id, function(err, docs){
      docs.notes.push(new CityModel({body: req.body.body}))
      docs.save(function(err){
        if(!err){
          res.redirect("/user/" + req.params.id)
        }
      });
    });
  }
}

module.exports = usersController;
