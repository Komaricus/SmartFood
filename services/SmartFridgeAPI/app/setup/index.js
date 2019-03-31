const mongoose = require('mongoose');

const models = {
  User: mongoose.model('User'),
  Product: mongoose.model('Product'),
  Recipe: mongoose.model('Recipe'),
  Diet: mongoose.model('Diet'),
}

module.exports = models;