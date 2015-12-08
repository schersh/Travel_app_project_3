// express dependency for our application
var express = require('express')
// loads mongoose dependency
var router = express.Router();
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
})

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
}
app.get("/signup", usersController.getSignup);
app.post("/signup", usersController.postSignup);
app.get("/login", usersController.getLogin);
app.post("/login", usersController.postLogin);
app.get("/logout", usersController.getLogout);
app.get("/user/{{_id}}", usersController.userPage);

var passport    = require('passport');

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

module.exports = router;
