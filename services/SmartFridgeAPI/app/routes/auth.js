const models = require('@SmartFridge/app/setup');
module.exports = (app) => {
  const api = app.SmartFridgeAPI.app.api.auth;
  app.route('/')
    .get((req, res) => res.send('Smart Fridge API'));
  app.route('/api/v1/auth')
    .post(api.login(models.User));
}