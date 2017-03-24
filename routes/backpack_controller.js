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
