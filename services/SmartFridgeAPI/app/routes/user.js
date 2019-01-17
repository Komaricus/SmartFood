const models = require('@SmartFridge/app/setup');

module.exports = (app) => {
  const api = app.SmartFridgeAPI.app.api.user;

  app.route('/api/v1/signup')
    .post(api.signup(models.User));
}