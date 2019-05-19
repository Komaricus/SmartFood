const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  barcodes: {
    type: Array
  }
});

mongoose.model('Scaner', Schema);