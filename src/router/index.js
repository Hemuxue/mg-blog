import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login.vue'
import Main from 'components/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main
    }
  ]
})
