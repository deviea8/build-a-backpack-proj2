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
  if (currentUser.admin === true) {
    next()
  } else if (!currentUser || currentUser._id !== req.params.id ) {
    res.send({status: 401})
  } else {
    next()
  }
};

// Allow only admins access - NEED TO FIX!!!
// var adminOnly = function(req, res, next) {
//   var currentUserId = req.params.id;
//   User.findById(currentUserId)
//     .exec(function(err,user){
//       if(err) {
//         console.log(err)
//       } else if(user.admin === true) {
//         next()
//       } else {
//         res.send("Sorry, only admins can view this page.");
//       }
//     });
//   };


module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
}
