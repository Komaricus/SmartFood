import Axios from 'axios'
import {
  BACK_END_URL
} from '@/router'

export default class RecipesList {

  static getRecipes(category) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Axios.get(`${BACK_END_URL}/recipes/${category}`);
        const data = res.data;
        resolve(
          data.map(recipe => ({
            ...recipe
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getRecipesByMeal(meal) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Axios.get(`${BACK_END_URL}/recipes/meal/${meal}`);
        const data = res.data;
        resolve(
          data.map(recipe => ({
            ...recipe
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTitle(type) {
    switch (type) {
      case 'salads':
        return 'Cалаты'
        break;
      case 'second-dishes':
        return 'Вторые блюда'
        break;
      case 'starters':
        return 'Закуски'
        break;
      case 'soups':
        return 'Супы'
        break;
      case 'bakery':
        return 'Выпечка'
        break;
      case 'drinks':
        return 'Напитки'
        break;
      case 'deserts':
        return 'Десерты'
        break;
      case 'others':
        return 'Другие рецепты'
        break;
      default:
        return 'Ошибка'
        break;
    }
  }
}
