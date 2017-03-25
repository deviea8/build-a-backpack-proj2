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
      res.json({status: 401, data: "unauthorized"})
    } else if (bcrypt.compareSync(password, foundUser.password)) {
      req.session.currentUser = foundUser;
    }
    next()
  })
  .catch(function(err){
    res.json({status: 500, data: err})
  });
}

// Authorize user to have access
var authorize = function(req, res, next) {
  var currentUser = req.session.currentUser

  // THIS ASSUMES THAT EVERY :id refers to the user _id
  // needs to check if the current user doesn't exist, if it does then make
  // sure that the id of the logged in user and the id of the route match
  if (!currentUser || currentUser._id !== req.params.id ) {
    // customize
    // res.render('errors/401.hbs')
    // res.redirect('/users')
    res.send({status: 401})
  } else {
    next()
  }
};

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
}
