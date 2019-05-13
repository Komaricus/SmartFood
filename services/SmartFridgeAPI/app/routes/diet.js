const models = require('@SmartFridge/app/setup');

module.exports = (app) => {
    const api = app.SmartFridgeAPI.app.api.diet;

    app.route('/diets/:category').get(api.loadDietsByCategory(models.Diet));
    app.route('/diet/:id').get(api.loadDietById(models.Diet));
}