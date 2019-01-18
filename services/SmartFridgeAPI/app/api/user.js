const mongoose = require('mongoose');

const api = {};

api.signup = (User) => (req, res) => {
  if (!req.body.username || !req.body.password) res.json({ success: false, message: 'Заполните обязательные поля' });
  else {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(error => {
      if (error) return res.status(400).json({ success: false, message: 'Имя пользователя занято' });
      res.json({ success: true, message: 'Аккаунт создан' });
    });
  }
}

module.exports = api;
