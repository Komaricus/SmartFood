const mongoose = require('mongoose');
const mongodb = require('mongodb');

const api = {};

api.createRecipe = (Recipe) => (req, res) => {
  if (!req.body.title) res.json({
    success: false,
    message: 'Заполните обязательные поля'
  });
  else {
    const recipe = new Recipe({
      title: req.body.title,
      img: req.body.img,
      descr: req.body.descr,
      type: req.body.type,
      ingredients: req.body.ingredients,
      meal: req.body.meal,
      portions: req.body.portions,
      method: req.body.method,
      days: req.body.days
    });

    recipe.save(error => {
      if (error) return res.status(error.code).json({
        success: false,
        message: 'Произошла ошибка'
      });
      res.json({
        success: true,
        message: 'Рецепт создан'
      });
    });
  }
}

api.deleteRecipe = (Recipe) => (req, res) => {

  Recipe.findByIdAndDelete({
    _id: req.params.id,
  }, (error) => {
    if (error) throw error;
    res.status(200).send();
  });
}

api.findRecipe = (Recipe) => (req, res) => {

  Recipe.find({
    _id: req.params.id
  }, (error, recipe) => {
    if (error) throw error;
    res.status(200).json(recipe);
  });

}

api.loadRecipes = (Recipe) => (req, res) => {

  Recipe.find({
    type: {
      $in: [req.params.category]
    }
  }, (error, recipes) => {
    if (error) throw error;
    res.status(200).json(recipes);
  });
}

module.exports = api;