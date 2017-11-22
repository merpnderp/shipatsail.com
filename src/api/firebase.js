import config from './firebase-config'
import firebase from 'firebase'
import store from '../store'

firebase.initializeApp(config)

export const signIn = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    console.log(error)
  })
}

export const signOut = () => {
  firebase.auth().signOut().then(function () {
  }).catch(function (error) {
    console.log(error)
  })
}

export const createUserWithEmailAndPassword = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    console.log(error)
  })
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user)
    store.dispatch('setUser', JSON.parse(JSON.stringify(user)))
  } else {
    store.dispatch('setUser', undefined)
    console.log('No User')
  }
})
