const models = require('@SmartFridge/app/setup');

module.exports = (app) => {
  const api = app.SmartFridgeAPI.app.api.user;

  app.route('/api/v1/signup')
    .post(api.signup(models.User));

  app.route('/api/v1/update').post(api.update(models.User));
  app.route('/api/v1/get/products/:user_id').get(api.getUserProducts(models.User));

}