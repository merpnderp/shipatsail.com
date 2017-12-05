import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
// import * as types from './mutation-types'
import users from './modules/users'
import * as getters from './getters'
// import products from './modules/products'
import createLogger from '../plugins/logger'
import { updateFolderName, addFolder, removeFolder } from '../api/firebase'
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
      // state.folders = folders.sort(function (a, b) { return (a.name > b.name) - (a.name < b.name) })
      state.folders = folders.sort(function (a, b) { return (a.name.localeCompare(b.name)) })
    }
  },
  actions: {
    setFolders: ({ commit }, folders) => {
      commit('SET_FOLDERS', folders)
    },
    updateFolderName: ({ commit }, params) => {
      updateFolderName(params.id, params.name)
    },
    addFolder: ({ commit }, { name }) => {
      addFolder(name)
    },
    removeFolder: ({ commit }, folder) => {
      removeFolder(folder)
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
