import * as types from './mutation-types'
import * as firebase from '../api/firebase'

// const addToCart = ({ commit }, product) => {
//   if (product.inventory > 0) {
//     commit(types.ADD_TO_CART, {
//       id: product.id
//     })
//   }
// }

const signIn = ({ commit }, { email, password }) => {
  firebase.signIn(email, password)
}

const setUser = ({ commit }, user) => {
  commit(types.SET_USER, user)
}

export default {
  signIn,
  setUser
}
