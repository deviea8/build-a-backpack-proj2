var mongoose = require('mongoose');
var User = require('../models/user');
var Org = require('../models/org');
var Backpack = require('../models/backpack');

// Connect to database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/express-movies');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

// Use native promises
mongoose.promise = global.Promise;

Backpack.remove({}, function(err) {
    console.log(err);
});
User.remove({}, function(err) {
    console.log(err);
});
Org.remove({}, function(err) {
    console.log(err);
});

// Backpack data

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


// User data

var userOne = new User({
    first_name: 'Erin',
    last_name: 'Martin',
    email: 'emartin@352inc.com',
    password: 'erin',
    backpacks: {
        backpack_name: 'Erins backpack',
        pencils: 3,
        folders: 3,
        notebooks: 2,
        scissors: 0,
        erasers: 2,
        colored_pencils: 2,
        markers: 0,
        glue_sticks: 1,
        backpack_color: 'green',
        recipient_note: 'Testing'
    }
});

var userTwo = new User({
    first_name: 'Bo',
    last_name: 'Martin',
    email: 'bo@bo.com',
    password: 'bo',
    backpacks: {
        backpack_name: 'Bos backpack',
        pencils: 3,
        folders: 3,
        notebooks: 2,
        scissors: 0,
        erasers: 2,
        colored_pencils: 2,
        markers: 0,
        glue_sticks: 1,
        backpack_color: 'green',
        recipient_note: 'Puppies'
    }
});

userOne.save(function(err) {
  if (err) console.log(err);
  console.log('User one created!');
});

userTwo.save(function(err) {
  if (err) console.log(err);
  console.log('User two created!');
});

// Org data

var orgOne = new Org({
    org_name: 'Atlanta First UMC',
    org_type: 'church',
    location: 'Atlanta, GA',
    description: 'Atlanta First is an urban church located in the heart of downtown Atlanta'
});

var orgTwo = new Org({
    org_name: 'West Market Street UMC',
    org_type: 'church',
    location: 'Greensboro, NC',
    description: 'West Market Street UMC is a Methodist church'
});


orgOne.save(function(err) {
  if (err) console.log(err);
  console.log('Org one created!');
});

orgTwo.save(function(err) {
  if (err) console.log(err);
  console.log('Org two created!');
});


