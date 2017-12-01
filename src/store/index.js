import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
import * as types from './mutation-types'
import * as getters from './getters'
// import products from './modules/products'
import createLogger from '../plugins/logger'
import * as firebase from '../api/firebase'
import router from '../router'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {
    user: 'fetching',
    folders: []
  },
  mutations: {
    [types.SET_USER] (state, user) {
      state.user = user
    },
    [types.SET_FOLDERS] (state, folders) {
      state.folders = folders
    }
  },
  actions: {
    setUser: ({ commit }, user) => {
      if (user && (router.currentRoute.path === '/signin' || router.currentRoute.path === '/signup')) {
        router.push('/')
      }
      commit(types.SET_USER, user)
    },
    signIn: ({ commit }, { email, password }) => {
      commit(types.SET_USER, 'validating')
      setTimeout(() => {
        firebase.signIn(email, password)
      }, 5000)
    },
    signUp: ({ commit }, { email, password }) => {
      firebase.createUserWithEmailAndPassword(email, password)
    },
    signOut: () => {
      firebase.signOut()
    },
    setFolders: ({ commit }, folders) => {
      commit(types.SET_FOLDERS, folders)
    }

  },
  // actions,
  getters,
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
