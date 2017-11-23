var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    name: String,
    imageURL: String,
    imageCollection: Schema.ObjectId
});

module.exports = mongoose.model('Image', ImageSchema);