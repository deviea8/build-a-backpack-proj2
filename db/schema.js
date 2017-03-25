var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

// Backpack schema

var BackpackSchema = new Schema({
    backpack_name: String,
    pencils: Number,
    folders: Number,
    notebooks: Number,
    scissors: Number,
    erasers: Number,
    colored_pencils: Number,
    markers: Number,
    glue_sticks: Number,
    backpack_color: String,
    recipient_note: String
});

// User schema

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    backpacks: [BackpackSchema],
    created_at: Date,
    updated_at: Date
});

// Pre functions

UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

BackpackSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});


// Models

var UserModel = mongoose.model('User', UserSchema);
var BackpackModel = mongoose.model("Backpack", BackpackSchema);


module.exports = {
  User: UserModel,
  Backpack: BackpackModel
};
