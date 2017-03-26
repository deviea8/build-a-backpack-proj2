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
    res.render('orgs/index', {
      orgs: orgs
    });
  });
});

// Create new org page
router.get('/new', function(req, res){
  res.render('orgs/new');
});



// Individual organization show page
router.get('/:orgId', function(req, res) {
  Org.findById(req.params.orgId)
  .exec(function(err, org) {
    if (err) console.log(err);
    console.log(org);
    // res.render('user/show.hbs', { user: user } );
    res.render('orgs/show', {
      org: org
    });
  });
});


// Create new org / complete org setup
router.post('/', function(req, res){
  var newOrg = new Org({
    org_name: req.body.org_name,
    org_type: req.body.org_type,
    location: req.body.location,
    description: req.body.description
  });

  newOrg.save(function(err, org){
    newOrgId = newOrg.id;
    if (err) console.log(err);
    console.log(org);
    res.redirect('/org/' + newOrgId + '/users/signup-admin');
  });
});

module.exports = router;
