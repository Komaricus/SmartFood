const models = require('@SmartFridge/app/setup');

module.exports = (app) => {

  const api = app.SmartFridgeAPI.app.api.product;

  app.route('/products/:category').get(api.loadProducts(models.Product));
  app.route('/api/v1/products').post(api.createProduct(models.Product));
  app.route('/product/:id').delete(api.deleteProduct(models.Product));
  app.route('/product/:id').get(api.findProduct(models.Product));
  app.route('/product/:name').get(api.findProductByName(models.Product));
}