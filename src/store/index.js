import Vue from 'vue'
import Vuex from 'vuex'
// import actions from './actions'
import * as types from './mutation-types'
import * as getters from './getters'
// import products from './modules/products'
import createLogger from '../plugins/logger'
import router from '../router'
import { auth, db, createUserWithEmailAndPassword, signIn, signOut } from '../api/firebase'
Vue.use(Vuex)

export const USERSTATES = { 'LOGGEDOUT': 'LOGGEDOUT', 'FETCHING': 'FETCHING', 'LOGGEDIN': 'LOGGEDIN' }

const debug = process.env.NODE_ENV !== 'production'

// let folderSubscription

export default new Vuex.Store({
  state: {
    userState: USERSTATES.LOGGEDOUT,
    folders: []
  },
  mutations: {
    [types.SET_USER_STATE] (state, userState) {
      state.userState = userState
    },
    [types.SET_FOLDERS] (state, folders) {
      state.folders = folders
    }
  },
  actions: {
    setUserState: ({ commit, state }, userState) => {
      if (userState === USERSTATES.LOGGEDIN && (router.currentRoute.path === '/signin' || router.currentRoute.path === '/signup')) {
        router.push('/')
      }
      commit(types.SET_USER_STATE, userState)
      console.log('userState before getting folders', userState)
      if (userState === USERSTATES.LOGGEDIN && !!auth.currentUser.uid) {
        console.log('getting folders for ', auth.currentUser.uid)
        db.collection('users').doc(auth.currentUser.uid).collection('folders').onSnapshot((querySnapshot) => {
          console.log('callback called with ', querySnapshot)
          const folders = []
          querySnapshot.forEach((doc) => {
            folders.push({name: doc.data().name, id: doc.id})
            // folders.push({name: doc.data().name, editing: false})
          }, function (error) {
            console.log('Snapshot error', error)
          })
          // this.folders = folders
          commit(types.SET_FOLDERS, folders)
        })
      } else {
        commit(types.SET_FOLDERS, [])
      }
    },
    signIn: ({ commit }, { email, password }) => {
      commit(types.SET_USER_STATE, USERSTATES.FETCHING)
      signIn(email, password)
    },
    signUp: ({ commit }, { email, password }) => {
      createUserWithEmailAndPassword(email, password)
    },
    signOut: ({ commit }) => {
      signOut()
      // commit(types.SET_FOLDERS, [])
    }
    // ,
    // setFolders: ({ commit }, folders) => {
    //   commit(types.SET_FOLDERS, folders)
    // }

  },
  // actions,
  getters,
  modules: {
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
