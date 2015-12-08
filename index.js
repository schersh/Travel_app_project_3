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

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

router.route("/secret")
   .get(authenticatedUser, usersController.secret);


var passport    = require('passport');

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

module.exports = router; 
