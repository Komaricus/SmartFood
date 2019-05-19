const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String
  },
  barcodes: {
    type: Array
  }
});

mongoose.model('Scaner', Schema);