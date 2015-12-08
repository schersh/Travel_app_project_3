// express dependency for our application
var express = require('express')
// loads mongoose dependency
var mongoose = require('mongoose')
// loads dependency for middleware for paramters
var bodyParser = require('body-parser')
// loads dependency that allows put and delete where not supported in html
var methodOverride = require('method-override')
// loads module containing all authors controller actions. not defined yet...
var usersController = require("./controllers/usersController")
var citiesController = require("./controllers/citiesController")
var notesController = require("./controllers/notesController")
// connect mongoose interfaces to reminders mongo db
// mongoose.connect('mongodb://localhost/')
// invokes express dependency and sets namespace to app
var app = express()
// sets view engine to handlebars
app.set("view engine", "hbs")
// allows for parameters in JSON and html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// allows for put/delete request in html form
app.use(methodOverride('_method'))
// connects assets like stylesheets
app.use(express.static(__dirname + '/public'))

// app server located on port 4000
app.listen(4000, function(){
  console.log("app listening on port 4000")
})

// routes for all requests to this express app that map to an action/function
// in our controllers
app.get("/", function(req, res){
  res.render("index.hbs")
});

app.get("/user/:id", usersController.show);

app.get("/user/:user_id/city/:city_id", citiesController.show);
app.get("/cities/new", citiesController.new);
app.post("/cities", citiesController.create);
app.get("/cities/:city_id/edit", citiesController.edit);
app.put("/cities/:city_id", citiesController.update)
app.post("/city/:city_id/notes", citiesController.addNote);


//app.patch("user/:user_id/city/:city_id/note", citiesController.updateNote);
//app.delete("user/:user_id/:city_id/note", citiesController.removeNote);
