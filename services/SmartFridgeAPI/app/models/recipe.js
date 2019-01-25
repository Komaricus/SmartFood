const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  img: {
    type: String
  },

  descr: {
    type: String
  },

  type: {
    type: Array
  },

  ingredients: {
    type: Array
  },

  meal: {
    type: Array
  },

  portions: {
    type: Number
  },

  method: {
    type: String
  }
});

mongoose.model('Recipe', Schema);