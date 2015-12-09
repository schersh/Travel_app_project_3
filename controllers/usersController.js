var UserModel = require("../models/user")
var CityModel = require("../models/city")
var NoteModel = require("../models/note")
var passport = require("passport")

var usersController = {
  show: function(req, res){
    UserModel.findById(req.params.id, function(err, docs){
      console.log(docs)
      console.log(err)
      res.render("users/show", {user: docs})
    });
  },
}
  function getSignup(request, response) {
    response.render("signup.hbs", { message: request.flash('signupMessage') });
  }

  function postSignup(request, response, next) {
    var signupStrategy = passport.authenticate('local-signup', {
      // TODO change successRedirect : ('/user/' + user.id),
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
    });
    return signupStrategy(request, response, next);
  }

  function getLogin(request, response) {
    response.render('login.hbs', { message: request.flash('loginMessage') } );
  }

  function postLogin(request, response, next) {
    var loginProperty = passport.authenticate('local-login', {
      // TODO change successRedirect : ('/user/' + user.id),
      successRedirect : ('/'),
      failureRedirect : '/login',
      failureFlash : true
    });
    return loginProperty(request, response, next);
  }

	function getLogout(request, response) {
	  request.logout();
    request.session.destroy();
	  response.redirect('/');
	}


module.exports = usersController;
module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
};
