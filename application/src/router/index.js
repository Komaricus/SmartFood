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

import RecipesMenu from '@/components/pages/Recipes/RecipesMenu'
import RecipesList from '@/components/pages/Recipes/RecipesList/RecipesList'
import Recipe from '@/components/pages/Recipes/Recipe'

import Menu from '@/components/pages/Menu/Menu'
import Diets from '@/components/pages/Diets/Diets'
import DietsList from '@/components/pages/Diets/DietsList/DietsList'
import DietItem from '@/components/pages/Diets/DietItem'
import Dashboard from '@/components/pages/Dashboard/Dashboard'
import NotFound from '@/components/pages/NotFound'

// Global components
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// BE_URL
export const BACK_END_URL = 'https://smart-food-app.herokuapp.com'

// Dashboard components
import Fridge from '@/components/pages/Dashboard/Fridge'
import Supplement from '@/components/pages/Dashboard/Supplement'

// Register components
Vue.component('app-header', Header)
Vue.component('app-footer', Footer)
Vue.component('fridge', Fridge)
Vue.component('supplement', Supplement)

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
    },
    {
      path: '/recipes',
      name: 'Recipes Menu',
      component: RecipesMenu
    },
    {
      path: '/recipes/:category',
      name: 'Recipes List',
      component: RecipesList
    },
    {
      path: '/recipes/:category/:id',
      name: 'Recipe',
      component: Recipe
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/diets',
      name: 'Diets',
      component: Diets,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/diets/:category',
      name: 'DietsList',
      component: DietsList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/diets/:category/:id',
      name: 'DietItem',
      component: DietItem,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard/:id',
      name: 'Dashboard',
      components: {
        default: Dashboard,
        fridge: Fridge,
        supplement: Supplement
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  Auth.default.checkAuthentication();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Auth.default.user.authenticated) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
