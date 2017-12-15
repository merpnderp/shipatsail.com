import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import * as getters from './getters'
import createLogger from '../plugins/logger'
import { deleteNote, updateFolderName, addFolder, removeFolder, addNote, queryNotes, setNote } from '../api/firebase'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    folders: [],
    notes: []
  },
  mutations: {
    'SET_FOLDERS' (state, folders) {
      state.folders = folders.sort(function (a, b) { return (a.name.localeCompare(b.name)) })
    },
    'SET_CURRENT_FOLDER' (state, folderId) {
      state.currentFolderId = folderId
    },
    'SET_NOTES' (state, {folderId, notes}) {
      state.notes = { ...state.notes, [folderId]: notes.sort(function (a, b) { return (a.lastEdited < b.lastEdited) }) }
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
      console.log('Clearning Notes')
      // commit('SET_NOTES', [])
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
    setNotes: ({ commit }, {folderId, notes}) => {
      commit('SET_NOTES', {folderId, notes})
    },
    setNote: ({ commit, state }, note) => {
      setNote(note)
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
