var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

// Render login page
router.get('/login', function(req, res) {
  res.render('users/login')
});

// Authorize & log in user
router.post('/login', authHelpers.loginUser, function(req, res){
  console.log(req.session)
  var userId = req.session.currentUser.id
  res.redirect('/users/' + userId + '/backpacks')
});

// End session
router.delete('/', function(req, res){
  req.session.destroy(function() {
    res.redirect('/users')
  });
});

module.exports = router;
