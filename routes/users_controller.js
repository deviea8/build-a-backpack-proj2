var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

// User index - show all users
router.get('/', function(req, res) {
  console.log(req.session)
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('users/index.hbs', {
      users: users,
      currentUser: req.session.currentUser
    })
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
    password: res.hashedPassword
  });

  user.save(function(err, user){
    if (err) console.log(err);

    console.log(user);
    res.redirect('/users');
  });
});

module.exports = router;
