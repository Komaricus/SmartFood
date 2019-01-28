import Axios from 'axios'

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com'

export default {

  postUserProducts(context, user) {
    Axios.post(`${SmartFridgeAPI}/api/v1/update`, user)
      .then(({
        data
      }) => {
        context.snackbar = true
        context.message = data.message
      })
  }
}
