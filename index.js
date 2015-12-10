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
// TODO change usersController.show successfully to '/user/{{_id}}'
app.get("/user/:userId", usersController.show);
// app.get(authenticatedUser, usersController.profilePage);

// app server located on port 4000
app.listen(process.env.PORT || 4000), function(){
  console.log("app listening on port 4000")
})
