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

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(session({secret: "yo", resave: true, saveUninitialized: true}));
app.use(flash());

// loads controllers
var usersController = require("./controllers/usersController");
var citiesController = require("./controllers/citiesController");
var notesController = require("./controllers/notesController");

app.get("/", function(req, res){
  res.render("index.hbs")
});

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

  // Otherwise the request is always redirected to the home page
  res.redirect('/');
};

app.get("/signup", usersController.getSignup);
app.post("/signup", usersController.postSignup);
app.get("/login", usersController.getLogin);
app.post("/login", usersController.postLogin);
app.get("/logout", usersController.getLogout);
// TODO change usersController.show successfully to '/user/{{_id}}'
app.get("/user", usersController.show);

// app server located on port 4000
app.listen(4000, function(){
  console.log("app listening on port 4000")
})
