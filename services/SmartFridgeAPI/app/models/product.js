const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  exDate: {
    type: Number
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
    type: Number
  },

  water: {
    type: Number
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
    type: String
  },

  sku: {
    type: Array
  }
});

mongoose.model('Product', Schema);