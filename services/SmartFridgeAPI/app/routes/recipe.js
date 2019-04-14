const models = require('@SmartFridge/app/setup');

module.exports = (app) => {

  const api = app.SmartFridgeAPI.app.api.recipe;

  app.route('/recipes/:category').get(api.loadRecipes(models.Recipe));
  app.route('/api/v1/recipes').post(api.createRecipe(models.Recipe));
  app.route('/recipe/:id').delete(api.deleteRecipe(models.Recipe));
  app.route('/recipe/:id').get(api.findRecipe(models.Recipe));
}
