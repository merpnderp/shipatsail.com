import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/Authentication/SignIn'
import SignUp from '@/components/Authentication/SignUp'
import FolderList from '@/components/FolderList'
import Folder from '@/components/Folder'
import Note from '@/components/Note'
import store from '../store'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '', component: FolderList }
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
    },
    {
      path: '/folder/:folderId',
      name: 'Folder',
      component: Folder
    },
    {
      path: '/folder/:folderId/note/:noteId',
      name: 'Note',
      component: Note
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
