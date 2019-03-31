const models = require('@SmartFridge/app/setup');

module.exports = (app) => {
    const api = app.SmartFridgeAPI.app.api.diet;

    app.route('/diet/:category').get(api.loadDietsByCategory(models.Diet));
}
