import Axios from 'axios'
import router, {
  BACK_END_URL
} from '@/router'

export default {
  user: {
    authenticated: false
  },

  authenticate(context, credentials, redirect) {
    Axios.post(`${BACK_END_URL}/api/v1/auth`, credentials)
      .then(({
        data
      }) => {
        context.$cookie.set('token', data.token, '1D')
        context.$cookie.set('user_id', data.user._id, '1D')
        context.$cookie.set('name', data.user.name, '1D')
        context.$cookie.set('username', data.user.username, '1D')
        context.$cookie.set('diet', data.user.diet, '1D')
        localStorage.setItem('products', JSON.stringify(data.user.products));
        localStorage.setItem('menu', JSON.stringify(data.user.menu));
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

  signout(context, redirect) {
    context.$cookie.delete('token');
    context.$cookie.delete('user_id');
    context.$cookie.delete('name');
    context.$cookie.delete('username');
    context.$cookie.delete('diet');
    context.$cookie.delete('scaner');

    localStorage.removeItem('products');
    localStorage.removeItem('dishes');
    localStorage.removeItem('list');
    localStorage.removeItem('menu');
    this.user.authenticated = false;

    if (redirect) router.push(redirect)
  },

  checkAuthentication() {
    const token = document.cookie;
    this.user.authenticated = !!token;
  },

  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`;
  }
};
