import Axios from 'axios'
import Authentication from "@/components/pages/Authentication";

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com'

export default {

  signup(context, credentials, redirect) {
    if (!credentials.username || !credentials.password) {
      context.snackbar = true
      context.message = "Заполните обязательные поля"
    }
    else {
      Axios.post(`${SmartFridgeAPI}/api/v1/signup`, credentials)
        .then(() => {
          context.validSignUp = true

          Authentication.authenticate(context, credentials, redirect)
        }).catch(({
          response: {
            data
          }
        }) => {
          context.snackbar = true
          context.message = data.message
        })
    }
  },

  checkAuthentication() {
    const token = document.cookie
    Authentication.user.authenticated = !!token
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}