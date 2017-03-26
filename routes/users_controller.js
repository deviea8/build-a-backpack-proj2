var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var Org = require('../models/org.js');
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

// Signup page - donors
router.get('/signup', function(req, res){
  var thisOrg = Org.findById(req.params.orgId)
    .exec(function(err,org){
      if(err) {console.log(err)};
      console.log(org);
      res.render('users/signup', {
        orgId: req.params.orgId,
        orgName: org.org_name
      });
    });
});


// Admin signup page - drive managers
router.get('/signup-admin', function(req, res){
  var thisOrg = Org.findById(req.params.orgId)
    .exec(function(err,org){
      if(err) {console.log(err)};
      console.log(org);
      res.render('users/signup-admin', {
        orgId: req.params.orgId,
        orgName: org.org_name
      });
    });
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
  Org.findById(req.params.orgId)
  .exec(function(err,thisOrg){
    var newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      organization: req.body.organization,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      password: res.hashedPassword,
      org: req.body.org,
      admin: req.body.admin
    });
    newUser.save();
    thisOrg.users.push(newUser);
    thisOrg.save();
    res.redirect('/sessions/login');
    });
  });



module.exports = router;
