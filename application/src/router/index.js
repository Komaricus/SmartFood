import Vue from 'vue'
import Router from 'vue-router'
import * as Auth from '@/components/pages/Authentication'

// Pages
import MainComponent from '@/components/pages/MainComponent'
import Authentication from '@/components/pages/Authentication/Authentication'
import Registration from '@/components/pages/Registration/Registration'
import ProductsMenu from '@/components/pages/Products/ProductsMenu'
import ProductsList from '@/components/pages/Products/ProductsList/ProductsList'
import Product from '@/components/pages/Products/Product'

// Global components
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Register components
Vue.component('app-header', Header)
Vue.component('app-footer', Footer)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'MainComponent',
      components: {
        default: MainComponent,
        header: Header,
        footer: Footer
      }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/products-menu',
      name: 'Products Menu',
      component: ProductsMenu
    },
    {
      path: '/products-menu/:category',
      name: 'Products List',
      component: ProductsList
    },
    {
      path: '/products-menu/:category/:id',
      name: 'Product',
      component: Product
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path !== '/login') {
//     if (Auth.default.user.authenticated) {
//       next()
//     } else {
//       router.push('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router
