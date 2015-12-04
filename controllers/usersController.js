var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")

var usersController = {
  index: function(req, res){
    UserModel.find({}, function(err, docs){
      console.log(docs)
      console.log(err)
      res.render("users/index", {users: docs})
    });
  },
}

module.exports = usersController;
