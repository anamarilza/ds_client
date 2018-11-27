import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Posts from '@/components/Posts'
import NewPost from '@/components/NewPost'
import EditPost from '@/components/EditPost'
import UserProfile from '@/components/UserProfile'
import FAQ from '@/components/FAQ'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {

      path: '/userprofile',
      name: 'UserProfile',
      component: UserProfile
    },
    {

      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    }
  ]
})
