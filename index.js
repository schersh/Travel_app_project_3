// loads dependencies
var express     = require('express')
var session      = require('express-session');
var flash       = require('connect-flash');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var passport    = require('passport');
require('./config/passport')(passport);


app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({secret: "yo", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    global.currentUser = req.user;
    res.locals.currentUser = req.user;
    next();
  });

// loads controllers
var usersController = require("./controllers/usersController");
var citiesController = require("./controllers/citiesController");
var notesController = require("./controllers/notesController");

app.get("/", function(req, res){
  console.log(global.currentUser);
  res.render("index.hbs")
});
// Routes for CRUD actions
app.get("/user/:id", usersController.show);
app.get("/user/:user_id/city/:city_id", citiesController.show);
app.get("/user/{{user._id}}/city", citiesController.new);
app.post("/user/{{user._id}}/city", citiesController.create);
app.get("/cities/{{:city_id}}/edit", citiesController.edit);
app.put("/cities/:city_id", citiesController.update)
app.delete("/cities/city_id", citiesController.delete);
app.post("/city/:city_id/notes", citiesController.addNote);
app.get("/notes/new", notesController.new);
app.post("/notes", notesController.create);
app.get("/notes/:note_id/edit", notesController.edit);
app.put("/notes/:note_id", notesController.update);
app.delete("/notes/note_id", notesController.delete);

// use nested routes?
//app.patch("user/:user_id/city/:city_id/note", citiesController.updateNote);
//app.delete("user/:user_id/:city_id/note", citiesController.removeNote);
// app.get("/user/:user_id/city/:city_id", citiesController.show);
// app.post("/user/:user_id/city/:city_id/note", citiesController.addCity);
// app.get("user/:user_id", usersController.addCity)

// function authenticatedUser(req, res, next) {
//   // If the user is authenticated, then we continue the execution
//   if (req.isAuthenticated()) return next();
//
//   // Otherwise the request is always redirected to the home page
//   res.redirect('/');
// };
app.get("/signup", usersController.getSignup);
app.post("/signup", usersController.postSignup);
app.get("/login", usersController.getLogin);
app.post("/login", usersController.postLogin);
app.get("/logout", usersController.getLogout);

// app server located on port 4000
app.listen(4000, function(){
  console.log("app listening on port 4000")
})
