var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    rating: Number,
    numOfRatings: Number,
    creator: Schema.ObjectId
});

module.exports = mongoose.model('Collection', CollectionSchema);