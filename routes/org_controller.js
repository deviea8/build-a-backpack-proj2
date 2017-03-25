var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var Org = require('../models/org.js');
var Backpack = require('../models/backpack.js');
var authHelpers = require('../helpers/auth.js')

// Org index - show all organizations
router.get('/', function(req, res) {
  Org.find()
  .exec(function(err, orgs){
    if (err) { console.log(err); }
    res.send('org index')
  });
})

// Signup page
router.get('/signup', function(req, res){
  res.render('users/signup.hbs')
});


// User show page
router.get('/:id', authHelpers.authorize, function(req, res) {
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    // res.render('user/show.hbs', { user: user } );
    res.render('users/show.hbs', { user } );
  });
})

// Create new user / complete registration
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    organization: req.body.organization,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip_code: req.body.zip_code,
    password: res.hashedPassword
  });

  user.save(function(err, user){
    if (err) console.log(err);
    console.log(user);
    res.redirect('/sessions/login');
  });
});

module.exports = router;
