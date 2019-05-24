import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/login/login.vue'
import Main from 'components/main/main.vue'
import Home from 'components/home/home.vue'
import WriteArticle from 'components/Article/write_article.vue'
import ArticleList from 'components/Article/article_list.vue'
import Classify from 'components/classify/classify.vue'
import Tag from 'components/tag/tag.vue'
import UserDetail from 'components/user/user_detail.vue'
import UserList from 'components/user/user_list.vue'


Vue.use(Router)

 const router =  new Router({
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
      component: Main,
      children:[
        {
          path:'',
          redirect: 'home',
        },
        {
          path:'home',
          component: Home
        },
        {
          path:'WriteArticle',
          component: WriteArticle
        },
        {
          path:'articleList',
          component: ArticleList
        },
        {
          path: 'classify',
          component: Classify
        },
        {
          path: 'tag',
          component: Tag
        },
        {
          path: 'userDetail',
          component: UserDetail
        },
        {
          path: 'userList',
          component: UserList
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(localStorage.userData || sessionStorage.userData) {
    next();
  } else {
    if( to.path == '/login'){
      next();
    }else{
      next('/login');
    }
  }
})

export default router;



