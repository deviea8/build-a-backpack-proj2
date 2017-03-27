var express = require('express');
var router = express.Router({mergeParams: true});
var authHelpers = require('../helpers/auth.js');
var Backpack = require('../models/backpack');
var User = require('../models/user');
var Org = require('../models/org');
var mongoose = require("mongoose");


// Backpack index
router.get('/', authHelpers.authorize, function(req, res){
    var userId = req.params.id;
    console.log('--------------');
    console.log('--------------');
    Org.findById(req.params.orgId)
    .exec(function(err,org){
        if(err) {console.log(err)}
            res.render('backpacks/index', {
                user: org.users.id(req.params.id),
                backpacks: org.users.id(req.params.id).backpacks,
                orgId: org.id
        });
    });
});

// New backpack (form page)
router.get('/new', function(req, res) {
    res.render('backpacks/new', {
        userId: req.params.id,
        orgId: req.params.orgId
    });
});


// Create/post backpack - HOW DO I UPDATE ORG TOO?
router.post('/', function createNewBackpack(req, res){
    Org.findById(req.params.orgId)
    .exec(function(err,org){
        if(err) {console.log(err)}
        var newBackpack = new Backpack({
            backpack_name: req.body.backpack_name,
            pencils: req.body.pencils,
            folders: req.body.folders,
            notebooks: req.body.notebooks,
            scissors: req.body.scissors,
            erasers: req.body.erasers,
            colored_pencils: req.body.colored_pencils,
            markers: req.body.markers,
            glue_sticks: req.body.glue_sticks,
            backpack_color: req.body.backpack_color,
            recipient_note: req.body.recipient_note
        });
        var userId = req.params.id;
        var orgId = req.params.orgId;
        var user = org.users.id(userId);
        user.backpacks.push(newBackpack);
        org.save();
        res.redirect('/org/' + orgId + '/users/' + userId + '/backpacks/');
    });
});


// Edit individual backpack
router.get('/:backpackId/edit', function(req,res) {
    Backpack.findById(req.params.backpackId)
    .exec(function(err, backpack) {
        if (err) { console.log(err); }
        res.render('backpacks/edit', {
            backpack: backpack,
            userId: req.params.id,
            orgId: req.params.orgId
        });
    });
});


// Update/patch backpack -  ARE USER & ORG UPDATED WITH THIS AS WELL?
router.patch('/:backpackId', function(req, res) {
    Backpack.findByIdAndUpdate(req.params.backpackId, {
        backpack_name: req.body.backpack_name,
        pencils: req.body.pencils,
        folders: req.body.folders,
        notebooks: req.body.notebooks,
        scissors: req.body.scissors,
        erasers: req.body.erasers,
        colored_pencils: req.body.colored_pencils,
        markers: req.body.markers,
        glue_sticks: req.body.glue_sticks,
        backpack_color: req.body.backpack_color,
        recipient_note: req.body.recipient_note
    }, {new: true})
        .exec(function(err, backpack) {
            if (err) { console.log(err); }
            console.log(backpack);
            res.render('backpacks/show', {
              backpack: backpack,
              userId: req.params.id
            });
        });
});


// Delete backpack - Having some issues with this - after editing a backpack the edit and delete buttons don't work anymore
router.delete("/:backpackId", function(req, res) {
    console.log(req.params.id)
    console.log(req.params.orgId)
    User.findByIdAndUpdate(req.params.id, {
        $pull: {
            backpacks: {_id: req.params.backpackId}
        }
    })
        .exec(function(err, user) {
            if (err) { console.log(err); }
        });
    Backpack.findByIdAndRemove(req.params.backpackId)
        .exec(function(err, backpack) {
            if (err) { console.log(err); }
            res.redirect('/org/' + req.params.orgId + '/users/' + req.params.id + '/backpacks');
        });
});



// Show individual backpack - NOT POPULATING LINKS CORRECTLY AFTER SECOND BACKPACK
router.get('/:backpackId', function(req, res) {
    Backpack.findById(req.params.backpackId)
        .exec(function(err, backpack) {
            if(err) console.log(err);
            res.render('backpacks/show', {
                backpack: backpack,
                userId: req.params.id,
                orgId: req.params.orgId
            });
        });
});


module.exports = router;
