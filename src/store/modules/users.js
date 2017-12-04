import router from '../../router'
import { createUserWithEmailAndPassword, signIn, signOut } from '../../api/firebase'

export default {
  state: {
    userState: 'LOGGEDOUT',
    user: undefined
  },
  mutations: {
    'SET_USER_STATE' (state, userState) {
      state.userState = userState
    },
    'SET_USER' (state, user) {
      state.user = user
    }
  },
  actions: {
    setUserState: ({ commit, state }, userState) => {
      if (userState === 'LOGGEDIN' && (router.currentRoute.path === '/signin' || router.currentRoute.path === '/signup')) {
        router.push('/')
      }
      commit('SET_USER_STATE', userState)
      if (userState !== 'LOGGEDIN') {
        commit('SET_FOLDERS', [])
      }
    },
    setUser: ({ commit }, user) => {
      commit('SET_USER', user)
    },
    signIn: ({ commit }, { email, password }) => {
      commit('SET_USER_STATE', 'FETCHING')
      signIn(email, password)
    },
    signUp: ({ commit }, { email, password }) => {
      createUserWithEmailAndPassword(email, password)
    },
    signOut: ({ commit }) => {
      signOut()
    }
  }
}
