var mongoose = require('mongoose')
var conn = mongoose.connect('mongodb://localhost/travelapp')

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


mongoose.model("User", UserSchema)
mongoose.model("City", CitySchema)
mongoose.model("Note", NoteSchema)
