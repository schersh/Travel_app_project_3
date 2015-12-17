require("../db/schema");
var mongoose = require('mongoose')
var CityModel = mongoose.model("City")

//ERICA: This is unneccesary code, duplicates functionality/data modelling accomplished in schema.js
function City(name) {
  this.name = name;
}

module.exports = CityModel
