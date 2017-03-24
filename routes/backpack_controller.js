var express = require('express');
var router = express.Router();

var Backpack = require('../models/backpack');

// index backpacks
router.get('/', function(req, res) {
    Backpack.find()
        .exec(function(err, backpacks) {
            if(err) {console.log(err)};
            console.log(backpacks);
            res.render('backpacks/index', {
                backpacks: backpacks
            });
        });
});


// new backpack (form page)
router.get('/new', function(req, res) {
    res.render('backpacks/new');
});

// create/post backpack
router.post('/', function(req, res) {
    var backpack = new Backpack({
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
    backpack.save(function(err, backpack){
        if (err) { console.log(err); }
        console.log(backpack);
        res.send(backpack);
    });
});


// show individual backpack
router.get('/:id', function(req, res) {
    Backpack.findById(req.params.id)
        .exec(function(err, backpack) {
            if(err) console.log(err);
            console.log(backpack);
            res.render('backpacks/show', {
                backpack: backpack
            });
        });
});




module.exports = router;
