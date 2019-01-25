const mongoose = require('mongoose'),
  UserModel = require('@SmartFridgeModels/user'),
  ProductModel = require('@SmartFridgeModels/product'),
  RecipeModel = require('@SmartFridgeModels/recipe');;

const models = {
  User: mongoose.model('User'),
  Product: mongoose.model('Product'),
  Recipe: mongoose.model('Recipe')
}

module.exports = models;