const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const photoSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  uri: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  likes: {
    type: [String], // array of UserIds
    default: []
  }
});

const ModelClass = mongoose.model('photo', photoSchema);

module.exports = ModelClass;
