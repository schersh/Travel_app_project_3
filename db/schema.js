var mongoose = require('mongoose')

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
  email: String,
  cities: [CitySchema]
});





mongoose.model("User", UserSchema)
mongoose.model("City", CitySchema)
mongoose.model("Note", NoteSchema)
