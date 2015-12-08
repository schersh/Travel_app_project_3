  function authenticatedUser(req, res, next) {
    // If the user is authenticated, then we continue the execution
    if (req.isAuthenticated()) return next();

    // Otherwise the request is always redirected to the home page
    res.redirect('/');
  }

  app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });

    router.route("/secret")
    .get(authenticatedUser, usersController.secret)