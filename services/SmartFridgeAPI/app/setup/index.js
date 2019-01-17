const mongoose = require('mongoose'),
  UserModel = require('@SmartFridgeModels/user');
const models = {
  User: mongoose.model('User')
}
module.exports = models;