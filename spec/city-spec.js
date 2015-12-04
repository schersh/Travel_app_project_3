// describe "a city"
//   it should have a name
//   it should belong to a user's list of favorite cities
//   it should have notes associated
var City = require("../models/city");

describe ("a city", function(){
  it ("should have a name", function(){
    //expect city to have a name
    //expect city name to be defined
    var city = new City();
    city.name = "New York";
    expect(city.name).toBeDefined();
  });
  it ("should have one or more notes associated", function(){
    // 'toContain' matcher is for finding an item in an Array
    var city = new City();
    var note = new Note;
    var notes = [note]
    expect(city).toContain(notes);
  });
  it ("should belong to a user", function(){

  });
});
