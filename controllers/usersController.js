var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")

var usersController = {
  show: function(req, res){
    UserModel.findById(req.params.id, function(err, docs){
      res.render("users/show", {user: docs})
    });
  },
};


// neccessary to add city via user model?
//   addCity: function(req, res){
//     UserModel.findById(req.params.id, function(err, docs){
//       docs.notes.push(new CityModel({body: req.body.body}))
//       docs.save(function(err){
//         if(!err){
//           res.redirect("/user/" + req.params.id)
//         }
//       });
//     });
//   }
// }


module.exports = usersController;
