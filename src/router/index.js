import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import HelloWorld from '@/components/Home'
import SignIn from '@/components/Authentication/SignIn'
import SignUp from '@/components/Authentication/SignUp'
import FolderList from '@/components/FolderList'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /user/:id is matched
        { path: '', component: FolderList }
        // ...other sub routes
      ]
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

router.beforeEach((to, from, next) => {
  if ((to.path === '/signup' || to.path === '/signin') && store.state.userState === 'LOGGEDIN') {
    next('/')
  } else if (to.path === '/signout') {
    store.dispatch('signOut')
    next('/')
  } else {
    next()
  }
})

export default router
