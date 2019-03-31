import Axios from 'axios';
import router from '@/router';

const SmartFridgeAPI = 'https://smart-food-app.herokuapp.com';

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
        context.$cookie.set('name', data.user.name, '1D')
        context.$cookie.set('username', data.user.username, '1D')
        localStorage.setItem('products', JSON.stringify(data.user.products));
        localStorage.setItem('dishes', JSON.stringify(data.user.dishes));
        localStorage.setItem('list', JSON.stringify(data.user.list));
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
    context.$cookie.delete('token');
    context.$cookie.delete('user_id');
    context.$cookie.delete('name');
    context.$cookie.delete('username');

    localStorage.removeItem('products');
    localStorage.removeItem('dishes');
    localStorage.removeItem('list');
    this.user.authenticated = false;

    router.go(0);
  },

  checkAuthentication() {
    const token = document.cookie;
    this.user.authenticated = !!token;
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`;
  }
};
