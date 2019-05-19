const models = require('@SmartFridge/app/setup');

module.exports = (app) => {

  const api = app.SmartFridgeAPI.app.api.scaner;

  app.route('/scaner/:name').get(api.findScaner(models.Scaner));
  app.route('/api/v1/scaner').post(api.createScaner(models.Scaner));
  app.route('/api/v1/scaner/:name').post(api.updateScaner(models.Scaner));

  app.route('/scaner/:name').delete(api.deleteScaner(models.Scaner));
}