var express = require('express');
var router = express.Router();

var Backpack = require('../models/backpack');

// index authors
router.get('/', function(req, res) {
    res.send('backpacks will be here');
});

module.exports = router;
