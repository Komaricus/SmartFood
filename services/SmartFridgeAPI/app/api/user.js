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

api.update = (User) => (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $set: {
      products: req.body.products
    }
  }, {
    new: true
  }, function (err, user) {
    if (err) return handleError(err);
    res.send(user);
  });
}

module.exports = api;