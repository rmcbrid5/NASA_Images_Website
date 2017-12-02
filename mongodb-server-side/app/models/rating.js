var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
    collectionID: Schema.ObjectId,
    User: Schema.ObjectId,
    Rating: Number
});

module.exports = mongoose.model('Rating', RatingSchema);