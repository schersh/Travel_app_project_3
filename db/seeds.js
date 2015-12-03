// requires mongoose dependencies
var mongoose = require('mongoose')
// connects us to the reminders database in mongo
var conn = mongoose.connect('mongodb://localhost/reminders')
// require our model definitions we defined earlier
var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")
// removes any existing authors and reminders from our database
UserModel.remove({}, function(err){
});
CityModel.remove({}, function(err){
});
NoteModel.remove({}, function(err){
});

// creates 3 users and 6 ities in memory

var sarah = new UserModel({email: "sarah@example.com"})
var qadriyyah = new UserModel({email: "qadriyyah@example.com"})
var cassidy = new UserModel({email: "cassidy@example.com"})


var city1 = new CityModel({name: "Brooklyn"})
var city2 = new CityModel({name: "Washington, DC"})
var city3 = new CityModel({name: "London"})
var city4 = new CityModel({name: "Berlin"})
var city5 = new CityModel({name: "Amsterdam"})
var city6 = new CityModel({name: "Seattle"})

var users = [sarah, qadriyyah, cassidy]
var cities = [city1, city2, city3, city4, city5, city6]

for(var i = 0; i < users.length; i++){
  users[i].cities.push(cities[i], cities[i+3])
  users[i].save(function(err){
    if (err){
      console.log(err)
    }else {
      console.log("user was saved")
    }
  });
};
