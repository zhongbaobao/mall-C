import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Classify from '../views/Classify.vue'
import Shopping from '../views/Shopping.vue'
import Search from '../views/Search.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/Home',
    component: Home,
    children: [{
      path: 'Shopping',
      component: Shopping
    }, {
      path: 'Classify',
      component: Classify
    }]
  },
  {
    path:'/Search',
    component:Search
  },
  {
    path: '*',
    redirect: '/Home/Classify'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router