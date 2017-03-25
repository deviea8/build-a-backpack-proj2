var express = require('express');
var router = express.Router({mergeParams: true});
var User = require('../models/user.js');
var Org = require('../models/org.js');
var Backpack = require('../models/backpack.js');
var authHelpers = require('../helpers/auth.js')

// Organization index - show all organizations
router.get('/', function(req, res) {
  Org.find()
  .exec(function(err, orgs){
    if (err) { console.log(err); }
    res.send('view all organizations who are running drives, ability to click on each to learn more')
  });
})

// Organization signup page
router.get('/signup', function(req, res){
  res.send('Register your organization for a backpack drive. Include org signup form here')
});


// Individual organization show page
router.get('/:orgId', function(req, res) {
  Org.findById(req.params.orgId)
  .exec(function(err, org) {
    if (err) console.log(err);
    console.log(org);
    // res.render('user/show.hbs', { user: user } );
    res.send('individual org show page. include info and user signup form here')
})


// Create new org / complete org setup - do I need auth on this?
router.post('/', function(req, res){
  var newOrg = new Org({
    org_name: req.body.org_name,
    org_type: req.body.org_type,
    location: req.body.location,
    description: req.body.description
  });

  newOrg.save(function(err, org){
    if (err) console.log(err);
    console.log(org);
    res.redirect('/org');
  });
});

module.exports = router;
