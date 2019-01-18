const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
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
    type: String,
    required: true
  },

  descr: {
    type: String,
    required: true
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