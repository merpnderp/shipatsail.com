import config from './firebase-config'
import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store'

firebase.initializeApp(config)

export const db = firebase.firestore()

export const auth = firebase.auth()

export const signIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password).then((user) => {
    store.dispatch('setUserState', 'LOGGEDIN')
  }).catch(function (error) {
    store.dispatch('setUserState', 'LOGGEDOUT')
    console.log(error)
  })
}

export const signOut = () => {
  auth.signOut().then(function () {
    store.dispatch('setUserState', 'LOGGEDOUT')
  }).catch(function (error) {
    console.log(error)
  })
}

export const resetPassword = () => {
  auth.resetPassword()
}

export const updateEmail = (email) => {
  auth.updateEmail(email)
}

export const createUserWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      user.sendEmailVerification().then(function () {
        // Email sent.
      }).catch(function (error) {
        console.log(error)
        // An error happened.
      })
    }).catch(function (error) {
      console.log(error)
    })
}

let folderWatchHandler
auth.onAuthStateChanged(function (user) {
  if (user) {
    // console.log('calling getIdToken', user)
    user.getIdToken().then((accessToken) => {
      // console.log('after calling getIdToken')
      store.dispatch('setUserState', 'LOGGEDIN')
      store.dispatch('setUser', JSON.parse(JSON.stringify(user)))
      // store.dispatch('setUser', user.email)
      folderWatchHandler = setFolderWatch()
    })
  } else {
    store.dispatch('setUserState', 'LOGGEDOUT')
    console.log('There was no user')
    folderWatchHandler && folderWatchHandler()
  }
})

function setFolderWatch () {
  return db.collection('users').doc(auth.currentUser.uid).collection('folders').onSnapshot((querySnapshot) => {
    console.log('callback called with ', querySnapshot)
    const folders = []
    querySnapshot.forEach((doc) => {
      folders.push({name: doc.data().name, id: doc.id})
      // folders.push({name: doc.data().name, editing: false})
    }, function (error) {
      console.log('Snapshot error', error)
    })
    // this.folders = folders
    store.dispatch('setFolders', folders)
  })
}

// setTimeout(function () {
//   const citiesRef = db.collection('cities')
//   Promise.all([
//     citiesRef.doc('SF').set({ name: 'San Francisco', state: 'CA', country: 'USA', capital: false, population: 860000 }),
//     citiesRef.doc('LA').set({ name: 'Los Angeles', state: 'CA', country: 'USA', capital: false, population: 3900000 }),
//     citiesRef.doc('DC').set({ name: 'Washington, D.C.', state: 'Poopistan', country: 'USA', capital: true, population: 680000 }),
//     citiesRef.doc('TOK').set({ name: 'Tokyo', state: null, country: 'Japan', capital: true, population: 9000000 }),
//     citiesRef.doc('BJ').set({ name: 'Beijing', state: null, country: 'China', capital: true, population: 21500000 })
//   ]).then(function () {
//     console.log('all done')
//   }).catch(function (error) {
//     console.log('error', error)
//   })
// }, 1000)
