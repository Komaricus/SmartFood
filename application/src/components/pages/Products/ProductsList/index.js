import Axios from 'axios'

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com'

export default class ProductsList {

  static getProducts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await Axios.get(`${SmartFridgeAPI}/products-menu/fruits-list`);
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

  getProduct(name) {
    Axios.get(`${SmartFridgeAPI}/products/${name}`).then(({
      data
    }) => {
      context.product = data
    }).catch(({
      response: {
        data
      }
    }) => {
      context.snackbar = true
      context.message = data.message
    })
  }
}
