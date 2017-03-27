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


// Create/post backpack
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
    Org.findById(req.params.orgId)
    .exec(function(err, org) {
        if (err) { console.log(err); }
        res.render('backpacks/edit', {
            backpack: org.users.id(req.params.id).backpacks.id(req.params.backpackId),
            userId: req.params.id,
            orgId: req.params.orgId
        });
    });
});

// HOW DO I DO THIS USING ORG???
// // Update/patch backpack
// router.patch('/:backpackId', function(req, res) {
//     var org = req.params.orgId;
//     var user = req.params.id;
//     Org.findByIdAndUpdate(req.params.orgId, {
//         backpack_name: req.body.backpack_name,
//         pencils: req.body.pencils,
//         folders: req.body.folders,
//         notebooks: req.body.notebooks,
//         scissors: req.body.scissors,
//         erasers: req.body.erasers,
//         colored_pencils: req.body.colored_pencils,
//         markers: req.body.markers,
//         glue_sticks: req.body.glue_sticks,
//         backpack_color: req.body.backpack_color,
//         recipient_note: req.body.recipient_note
//     }, {new: true})
//         .exec(function(err, backpack) {
//             if (err) { console.log(err); }
//             console.log(backpack);
//             res.render('backpacks/show', {
//               backpack: backpack,
//               userId: req.params.id
//             });
//         });
// });


router.patch('/:backpackId', function(req,res){
    Org.findById(req.params.orgId)
        .exec(function(err,org){
            if(err) {console.log(err)}
            console.log(org)
            var orgUser = req.params.id;
            var thisBackpack = org.users.id(orgUser).backpacks.id(req.params.backpackId);
            console.log(thisBackpack);
            thisBackpack.update({ _id: req.params.backpackId }, { $set: {backpack_name: req.body.backpack_name}})
    });
});


// HOW DO I DELETE BACKPACK FROM ORG???
// Delete backpack - Having some issues with this - after editing a backpack the edit and delete buttons don't work anymore
router.delete("/:backpackId", function(req, res) {
    console.log(req.params.id)
    console.log(req.params.orgId)
    Org.findByIdAndUpdate(req.params.orgId, {
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



// Show individual backpack
router.get('/:backpackId', function(req, res) {
    Org.findById(req.params.orgId)
        .exec(function(err, org) {
            if(err) console.log(err);
            res.render('backpacks/show', {
                backpack: org.users.id(req.params.id).backpacks.id(req.params.backpackId),
                userId: req.params.id,
                orgId: req.params.orgId
            });
        });
});


module.exports = router;
