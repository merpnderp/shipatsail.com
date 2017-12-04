import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
// import * as types from './mutation-types'
import users from './modules/users'
import * as getters from './getters'
// import products from './modules/products'
import createLogger from '../plugins/logger'

Vue.use(Vuex)

// export const USERSTATES = { 'LOGGEDOUT': 'LOGGEDOUT', 'FETCHING': 'FETCHING', 'LOGGEDIN': 'LOGGEDIN' }

const debug = process.env.NODE_ENV !== 'production'

// let folderSubscription

export default new Vuex.Store({
  state: {
    folders: []
  },
  mutations: {
    'SET_FOLDERS' (state, folders) {
      state.folders = folders
    }
  },
  actions: {
    setFolders: ({ commit }, folders) => {
      commit('SET_FOLDERS', folders)
    }
  },
  // actions,
  getters,

  modules: {
    users
  },

  strict: debug,
  plugins: debug ? [createLogger()] : []
})
