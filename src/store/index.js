import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
// import * as types from './mutation-types'
import users from './modules/users'
import * as getters from './getters'
// import products from './modules/products'
import createLogger from '../plugins/logger'
import { deleteNote, updateFolderName, addFolder, removeFolder, addNote, queryNotes } from '../api/firebase'
Vue.use(Vuex)

// export const USERSTATES = { 'LOGGEDOUT': 'LOGGEDOUT', 'FETCHING': 'FETCHING', 'LOGGEDIN': 'LOGGEDIN' }

const debug = process.env.NODE_ENV !== 'production'

// let folderSubscription

export default new Vuex.Store({
  state: {
    folders: [],
    notes: []
  },
  mutations: {
    'SET_FOLDERS' (state, folders) {
      // state.folders = folders.sort(function (a, b) { return (a.name > b.name) - (a.name < b.name) })
      state.folders = folders.sort(function (a, b) { return (a.name.localeCompare(b.name)) })
    },
    'SET_NOTES' (state, notes) {
      state.notes = notes.sort(function (a, b) { return (a.lastEdited > b.lastEdited) })
    }
  },
  actions: {
    addFolder: ({ commit }, { name }) => {
      addFolder(name)
    },
    addNote: ({ commit }, folderId) => {
      addNote(folderId)
    },
    clearNotes: ({ commit }) => {
      commit('SET_NOTES', [])
    },
    deleteNote: ({ commit }, params) => {
      deleteNote(params.folderId, params.noteId)
    },
    removeFolder: ({ commit }, folder) => {
      removeFolder(folder)
    },
    queryNotes: ({ commit }, folderId) => {
      queryNotes(folderId)
    },
    setFolders: ({ commit }, folders) => {
      commit('SET_FOLDERS', folders)
    },
    setNotes: ({ commit }, notes) => {
      commit('SET_NOTES', notes)
    },
    updateFolderName: ({ commit }, params) => {
      updateFolderName(params.id, params.name)
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
