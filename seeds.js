var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/build-a-backpack');
var Backpack = require("./models/backpack");
mongoose.promise = global.Promise;
Backpack.remove({}, function(err) {
    console.log(err);
});

var backpackOne = new Backpack({
    backpack_name: 'Blue backpack',
    pencils: 2,
    folders: 2,
    notebooks: 3,
    scissors: 1,
    erasers: 1,
    colored_pencils: 0,
    markers: 1,
    glue_sticks: 0,
    backpack_color: 'blue',
    recipient_note: 'Best of luck to you!'
});

var backpackTwo = new Backpack({
    backpack_name: 'Backpack for high school student',
    pencils: 3,
    folders: 3,
    notebooks: 2,
    scissors: 0,
    erasers: 2,
    colored_pencils: 2,
    markers: 0,
    glue_sticks: 1,
    backpack_color: 'green',
    recipient_note: 'Enjoy school'
});

backpackOne.save(function(err) {
  if (err) console.log(err);
  console.log('Backpack one created!');
});

backpackTwo.save(function(err) {
  if (err) console.log(err);
  console.log('Backpack two created!');
});
