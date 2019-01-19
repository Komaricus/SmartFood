const models = require('@SmartFridge/app/setup');

module.exports = (app) => {

  const api = app.SmartFridgeAPI.app.api.product;

  app.route('/products-menu/fruits-list').get(api.loadProducts(models.Product));
  app.route('/products-menu/fruits-list').post(api.createProduct(models.Product));
  app.route('/products-menu/fruits-list/:id').delete(api.deleteProduct(models.Product));
  app.route('/products-menu/fruits-list/:id').get(api.findProduct(models.Product));
  app.route('/products/:name').get(api.findProductByName(models.Product));
}