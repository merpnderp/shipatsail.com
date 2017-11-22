import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
import * as types from './mutation-types'
import * as getters from './getters'
// import products from './modules/products'
import createLogger from '../plugins/logger'
import * as firebase from '../api/firebase'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  state: {
    user: 'fetching'
  },
  mutations: {
    [types.SET_USER] (state, user) {
      state.user = user
    }
  },
  actions: {
    signIn: ({ commit }, { email, password }) => {
      firebase.signIn(email, password)
    },
    setUser: ({ commit }, user) => {
      commit(types.SET_USER, user)
    },
    signOut: () => {
      firebase.signOut()
    }

  },
  // actions,
  getters,
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
