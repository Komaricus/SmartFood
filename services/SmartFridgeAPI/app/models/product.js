const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  exDate: {
    type: Number,
    required: true
  },

  cals: {
    type: Number,
    required: true
  },

  prots: {
    type: Number,
    required: true
  },

  fats: {
    type: Number,
    required: true
  },

  carbs: {
    type: Number,
    required: true
  },

  fibers: {
    type: Number,
    required: true
  },

  water: {
    type: Number,
    required: true
  },

  img: {
    type: String
  },

  descr: {
    type: String
  },

  type: {
    type: String,
    required: true
  },

  quant: {
    type: String,
    required: true
  }
});

mongoose.model('Product', Schema);
