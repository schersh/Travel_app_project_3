require("../db/schema");
var mongoose = require('mongoose')
var CityModel = mongoose.model("City")

function City(name) {
  this.name = name;
}

module.exports = CityModel
