import Axios from 'axios'
import {
  BACK_END_URL
} from '@/router'

export default {
  postUserProducts(context, user, message) {
    Axios.post(`${BACK_END_URL}/api/v1/update`, user)
      .then(({
        data
      }) => {
        context.snackbar = true;
        message ? context.message = message : context.message = data.message;
      })
  },

  getUserProducts(context, user_id) {
    Axios.get(`${BACK_END_URL}/api/v1/get/products/${user_id}`)
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

  postUserDishes(context, user, message) {
    Axios.post(`${BACK_END_URL}/api/v1/update/dishes`, user)
      .then(({
        data
      }) => {
        context.snackbar = true
        message ? context.message = message : context.message = data.message;
      })
  },

  getUserDishes(context, user_id) {
    Axios.get(`${BACK_END_URL}/api/v1/get/dishes/${user_id}`)
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
  },

  postUserShoppingList(context, user, message) {
    Axios.post(`${SmartFridgeAPI}/api/v1/update/shopping-list`, user)
      .then(({
        data
      }) => {
        context.snackbar = true
        message ? context.message = message : context.message = data.message;
      })
  },

  getUserShoppingList(context, user_id) {
    Axios.get(`${SmartFridgeAPI}/api/v1/get/shopping-list/${user_id}`)
      .then(({
        data
      }) => {
        context.$set(
          context.userData,
          "list",
          data.user_list
        );

        localStorage.setItem("list", JSON.stringify(data.user_list));
      })
  }
}
