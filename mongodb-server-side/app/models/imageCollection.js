var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    descrip: String,
    rating: Number,
    numOfRatings: Number,
    creator: Schema.ObjectId,
    priv: Boolean
});

module.exports = mongoose.model('Collection', CollectionSchema);