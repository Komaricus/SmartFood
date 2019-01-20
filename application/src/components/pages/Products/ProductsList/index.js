import Axios from 'axios'

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com'

export default class ProductsList {

  static getProducts(category) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Axios.get(`${SmartFridgeAPI}/${category}`);
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
      case 'vegetable':
        return 'Овощи'
        break;
      default:
        return 'Ошибка'
        break;
    }
  }
}
