var express = require('express');
var router = express.Router({mergeParams: true});
var authHelpers = require('../helpers/auth.js');
var Backpack = require('../models/backpack');
var User = require('../models/user');
var mongoose = require("mongoose");


// Backpack index - add auth here later!
router.get('/', function(req, res){
    User.findById(req.params.id)
    .exec(function(err,user){
        if(err) {console.log(err)}
            res.render('backpacks/index', {
                user: user,
                backpacks: user.backpacks
            });
    });
});

// New backpack (form page)
router.get('/new', function(req, res) {
    res.render('backpacks/new', {
        userId: req.params.id
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
        newBackpack.save();
        user.backpacks.push(newBackpack);
        user.save();
        res.redirect('/users/' + userId + '/backpacks/');
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
              backpack: backpack
            });
        });
});


// Delete backpack
router.delete('/:backpackId', function(req, res) {
    Backpack.findByIdAndRemove(req.params.id)
        .exec(function(err, backpack) {
            if (err) { console.log(err); }
            console.log('Backpack deleted.');
            res.redirect('/backpacks');
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
