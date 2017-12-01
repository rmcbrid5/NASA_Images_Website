var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageURL: String,
    imageCollection: Schema.ObjectId
});

module.exports = mongoose.model('Image', ImageSchema);