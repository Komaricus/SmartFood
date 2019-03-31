import Axios from 'axios'
import { BACK_END_URL } from '@/router'

export default class ProductsList {

  static getProducts(category) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Axios.get(`${BACK_END_URL}/products/${category}`);
        const data = res.data;
        resolve(
          data.map(product => ({
            ...product
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTitle(type) {
    switch (type) {
      case 'fruits':
        return 'Фрукты'
        break;
      case 'vegetables':
        return 'Овощи'
        break;
      case 'meat':
        return 'Мясо'
        break;
      case 'seafood':
        return 'Морепродукты'
        break;
      case 'dairy':
        return 'Молочные продукты'
        break;
      case 'cereals':
        return 'Крупы и мучные изделия'
        break;
      case 'poultry':
        return 'Птица'
        break;
      case 'condiment':
        return 'Специи и соусы'
        break;
      default:
        return 'Ошибка'
        break;
    }
  }
}
