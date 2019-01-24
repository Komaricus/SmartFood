const mongoose = require('mongoose');

const api = {};

api.signup = (User) => (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    name: req.body.name,
    products: []
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

module.exports = api;