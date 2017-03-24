var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.promise = global.Promise;

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

BackpackSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

BackpackSchema.virtual('backpackName').get(function () {
    return this.backpack_name;
});

module.exports = mongoose.model("Backpack", BackpackSchema);
