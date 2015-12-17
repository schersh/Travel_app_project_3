// describe "a city"
//   it should have a name
//   it should belong to a user's list of favorite cities
//   it should have notes associated
// it ("should have one or more notes associated", function(){
//   // 'toContain' matcher is for finding an item in an Array
//   var city = new City();
//   var note = new Note;
//   var notes = [note]
//   expect(city).toContain(notes);
// });
// it ("should belong to a user", function(){
//
// });

var City = require("../models/city");
//ERICA: Woot!
describe ("a city", function(){
  it ("should have a name", function(){
    var newYork = new City("New York");
    expect(newYork.name).toBeDefined();
  });
});
