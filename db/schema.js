var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

var NoteSchema = new Schema({
  body: String
});

var CitySchema = new Schema({
  name: String,
  notes: [NoteSchema]
});

var UserSchema = new Schema({
  local : {
    email        : String,
    password     : String,
  },
  cities: [CitySchema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

mongoose.model("User", UserSchema)
mongoose.model("City", CitySchema)
mongoose.model("Note", NoteSchema)
