import Axios from 'axios'
import router from '@/router'

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com'

export default {
  user: {
    authenticated: false
  },

  authenticate(context, credentials, redirect) {
    Axios.post(`${SmartFridgeAPI}/api/v1/auth`, credentials)
      .then(({
        data
      }) => {
        context.$cookie.set('token', data.token, '1D')
        context.$cookie.set('user_id', data.user._id, '1D')
        context.validLogin = true

        this.user.authenticated = true
        if (redirect) router.push(redirect)
      }).catch(({
        response: {
          data
        }
      }) => {
        context.snackbar = true
        context.message = data.message
      })
  },

  signout(context) {
    context.$cookie.delete('token')
    context.$cookie.delete('user_id')
    this.user.authenticated = false

    router.go(0)
  },

  checkAuthentication() {
    const token = document.cookie
    this.user.authenticated = !!token
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
