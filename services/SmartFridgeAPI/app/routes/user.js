const models = require('@SmartFridge/app/setup');

module.exports = (app) => {
  const api = app.SmartFridgeAPI.app.api.user;

  app.route('/api/v1/signup')
    .post(api.signup(models.User));

  app.route('/api/v1/update').post(api.updateProducts(models.User));
  app.route('/api/v1/get/products/:user_id').get(api.getUserProducts(models.User));

  app.route('/api/v1/update/dishes').post(api.updateDishes(models.User));
  app.route('/api/v1/get/dishes/:user_id').get(api.getUserDishes(models.User));

  app.route('/api/v1/update/shopping-list').post(api.updateShoppingList(models.User));
  app.route('/api/v1/get/shopping-list/:user_id').get(api.getUserShoppingList(models.User));

  app.route('/api/v1/update/diet').post(api.updateDiet(models.User));
  app.route('/api/v1/get/diet/:user_id').get(api.getUserDiet(models.User));

  app.route('/api/v1/update/menu').post(api.updateMenu(models.User));
  app.route('/api/v1/get/menu/:user_id').get(api.getUserMenu(models.User));
}