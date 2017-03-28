var User = require('../models/user.js');
var bcrypt = require('bcrypt');

// Create hashed password
function createSecure(req, res, next) {
  var password = req.body.password;
  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next()
}


// Check for match in db for logging in user
var loginUser = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email
  })
  .then(function(foundUser){
    if (foundUser == null) {
      res.redirect('/sessions/login')
    } else if (bcrypt.compareSync(password, foundUser.password)) {
      req.session.currentUser = foundUser;
    }
    next()
  })
  .catch(function(err){
    res.redirect('/sessions/login')
  });
};


// Authorize user to have access
var authorize = function(req, res, next) {
  var currentUser = req.session.currentUser
  if (currentUser.admin === true) {
    next()
  } else if (!currentUser || currentUser._id !== req.params.id ) {
    res.redirect('/sessions/login')
  } else {
    next()
  }
};


module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
}
