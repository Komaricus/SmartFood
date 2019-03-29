const mongoose = require('mongoose');

const api = {};

api.signup = (User) => (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    products: [],
    dishes: []
  });

  user.save(error => {
    if (error) return res.status(400).json({
      success: false,
      message: 'Имя пользователя занято'
    });
    res.json({
      success: true,
      message: 'Аккаунт создан'
    });
  });

}

api.updateProducts = (User) => (req, res) => {
  User.findByIdAndUpdate(req.body.user_id, {
    $set: {
      products: req.body.products
    }
  }, {
    new: true
  }, function (err, user) {
    if (err) return handleError(err);
    res.status(200).send({
      success: true,
      message: 'Продукт добавлен'
    });
  });
}

api.updateDishes = (User) => (req, res) => {
  User.findByIdAndUpdate(req.body.user_id, {
    $set: {
      dishes: req.body.dishes
    }
  }, {
    new: true
  }, function (err, user) {
    if (err) return handleError(err);
    res.status(200).send({
      success: true,
      message: 'Блюдо добавлено',
      user: user
    });
  });
}

api.getUserProducts = (User) => (req, res) => {
  User.findById(
    req.params.user_id, (err, user) => {
      if (err) return handleError(err);
      res.status(200).send({
        success: true,
        user_products: user.products
      });
    });
}

api.getUserDishes = (User) => (req, res) => {
  User.findById(
    req.params.user_id, (err, user) => {
      if (err) return handleError(err);
      res.status(200).send({
        success: true,
        user_dishes: user.dishes
      });
    });
}
module.exports = api;