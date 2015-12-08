require("../db/schema")
var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');

var UserModel = mongoose.model("User")


// 
// UserModel.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };
//
// UserModel.methods.encrypt = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

module.exports = UserModel
