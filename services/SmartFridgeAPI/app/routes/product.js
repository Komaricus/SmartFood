const models = require('@SmartFridge/app/setup');

module.exports = (app) => {

  const api = app.SmartFridgeAPI.app.api.product;

  app.route('/:category').get(api.loadProducts(models.Product));
  app.route('/products').post(api.createProduct(models.Product));
  app.route('/products/:id').delete(api.deleteProduct(models.Product));
  app.route('/products/:id').get(api.findProduct(models.Product));
  app.route('/product/:name').get(api.findProductByName(models.Product));
}