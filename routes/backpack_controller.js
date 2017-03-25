var express = require('express');
var router = express.Router({mergeParams: true});
var authHelpers = require('../helpers/auth.js');
var Backpack = require('../models/backpack');
var User = require('../models/user');
var Org = require('../models/org');
var mongoose = require("mongoose");


// Backpack index
router.get('/', authHelpers.authorize, function(req, res){
    User.findById(req.params.id)
    .exec(function(err,user){
        if(err) {console.log(err)}
            res.render('backpacks/index', {
                user: user,
                backpacks: user.backpacks,
                userId: user.id,
                orgId: user.org
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


// Create/post backpack
router.post('/', function createNewBackpack(req, res) {
    User.findById(req.params.id)
    .exec(function(err,user){
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
        newBackpack.save();
        user.backpacks.push(newBackpack);
        user.save();
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
            userId: req.params.id
        });
    });
});


// Update/patch backpack
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


// Delete backpack - Danny said there may be a better way to do this - ask Liam
router.delete("/:backpackId", function(req, res) {
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
            res.redirect('/users/' + req.params.id + '/backpacks');
        });
});



// Show individual backpack
router.get('/:backpackId', function(req, res) {
    Backpack.findById(req.params.backpackId)
        .exec(function(err, backpack) {
            if(err) console.log(err);
            res.render('backpacks/show', {
                backpack: backpack,
                userId: req.params.id
            });
        });
});


module.exports = router;
