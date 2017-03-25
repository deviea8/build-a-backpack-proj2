var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

// Render sign up page
router.get('/signup', function(req, res){
  res.render('users/signup');
});

// User registration
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    email: req.body.email,
    password: res.hashedPassword,
    username: req.body.username
  });

  user.save(function(err, user){
    if (err) {console.log(err)};
    console.log(user);
    console.log(req.session.currentUser);
    res.redirect('/sessions/login');
  });
});


// Render login page
router.get('/login', function(req, res) {
  res.render('users/login')
});

// Authorize & log in user
router.post('/login', authHelpers.loginUser, function(req, res){
  console.log(req.session)
  res.redirect('/users')
});

// End session
router.delete('/', function(req, res){
  req.session.destroy(function() {
    res.redirect('/users')
  });
});

module.exports = router;
