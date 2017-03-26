var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var Org = require('../models/org.js');
var authHelpers = require('../helpers/auth.js')

// Render login page
router.get('/login', function(req, res) {
  var orgId = req.params.orgId
  res.render('users/login', {
    orgId: orgId
  })
});

// Authorize & log in user
router.post('/login', authHelpers.loginUser, function(req, res){
  console.log(req.session);
  var orgId = (req.session.currentUser.org).toString();
  var userId = (req.session.currentUser.id).toString();

    User.findById(userId)
      .exec(function(err, user) {
        if (user.admin !== true) {
          res.redirect('/org/' + orgId + '/users/' + userId + '/backpacks')
        }
        else {
          Org.findById(orgId)
            .exec(function(err,org){
              res.render('admin/dashboard.hbs', {
                org: org,
                user: user
              });
          });
      };
    });
});

// End session
router.delete('/', function(req, res){
  req.session.destroy(function() {
    res.redirect('/users')
  });
});

module.exports = router;
