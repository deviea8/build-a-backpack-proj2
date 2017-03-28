var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var Org = require('../models/org.js');
var authHelpers = require('../helpers/auth.js')

// Render login page
router.get('/login', function(req, res) {
  var orgId = req.params.orgId;
  res.render('users/login', {
    orgId: orgId
  });
});


// Authorize & log in user
router.post('/login', authHelpers.loginUser, function(req, res){
  console.log(req.session);
  if (req.session.currentUser ) {
  var orgId = req.session.currentUser.org;
  var userId = req.session.currentUser.id;

    User.findById(userId)
      .exec(function(err, user) {
        if (user.admin !== true) {
          // Route to backpack index
          res.redirect('/org/' + orgId + '/users/' + userId + '/backpacks');
        }
        else {
          // Route to admin dashboard
          res.redirect('/org/' + orgId + '/users/' + userId + '/dashboard');
        };
    });
  } else {
    res.redirect('/sessions/login')
  }
});


// End session
router.delete('/', function(req, res){
  req.session.destroy(function() {
    res.redirect('/');
  });
});

module.exports = router;
