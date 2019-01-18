const mongoose = require('mongoose'),
  UserModel = require('@SmartFridgeModels/user'),
  ProductModel = require('@SmartFridgeModels/product');

const models = {
  User: mongoose.model('User'),
  Product: mongoose.model('Product')
}

module.exports = models;