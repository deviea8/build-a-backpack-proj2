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

module.exports = router;
