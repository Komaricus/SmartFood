const mongoose = require('mongoose');

UserModel = require('@SmartFridgeModels/user'),
  ProductModel = require('@SmartFridgeModels/product'),
  RecipeModel = require('@SmartFridgeModels/recipe');;
DietModel = require('@SmartFridgeModels/diet')

const models = {
  User: mongoose.model('User'),
  Product: mongoose.model('Product'),
  Recipe: mongoose.model('Recipe'),
  Diet: mongoose.model('Diet'),
}

module.exports = models;