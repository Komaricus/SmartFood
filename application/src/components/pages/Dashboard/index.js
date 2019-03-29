import Axios from 'axios'

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com'
// const SmartFridgeAPI = 'http://localhost:3001'

export default {

  postUserProducts(context, user) {
    Axios.post(`${SmartFridgeAPI}/api/v1/update`, user)
      .then(({
        data
      }) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  getUserProducts(context, user_id) {
    Axios.get(`${SmartFridgeAPI}/api/v1/get/products/${user_id}`)
      .then(({
        data
      }) => {
        context.$set(
          context.userData,
          "products",
          data.user_products
        );

        localStorage.setItem("products", JSON.stringify(data.user_products));
      })
  },

  postUserDishes(context, user) {
    Axios.post(`${SmartFridgeAPI}/api/v1/update/dishes`, user)
      .then(({
        data
      }) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  getUserDishes(context, user_id) {
    Axios.get(`${SmartFridgeAPI}/api/v1/get/dishes/${user_id}`)
      .then(({
        data
      }) => {
        context.$set(
          context.userData,
          "dishes",
          data.user_dishes
        );

        localStorage.setItem("dishes", JSON.stringify(data.user_dishes));
      })
  }
}
