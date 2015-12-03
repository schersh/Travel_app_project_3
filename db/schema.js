var mongoose = require('mongoose')

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId

var NoteSchema = new Schema({
    body: String
});

var CitySchema = new Schema({
  body: String,
  notes: [NoteSchema]
});

var UserSchema = new Schema({
  body: String,
  cities: [CitySchema]
});





mongoose.model("User", UserSchema)
mongoose.model("City", CitySchema)
mongoose.model("Note", NoteSchema)
