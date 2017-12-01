import config from './firebase-config'
import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store'

firebase.initializeApp(config)

const db = firebase.firestore()
const auth = firebase.auth()

export const signIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    store.dispatch('setUser', undefined)
    console.log(error)
  })
}

export const signOut = () => {
  auth.signOut().then(function () {
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

auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log('setUser', user)
    user.getIdToken().then((accessToken) => {
      // auth.accessToken(accessToken)
      console.log(user)
      store.dispatch('setUser', JSON.parse(JSON.stringify(user)))
      getFolders()
    })
  } else {
    store.dispatch('setUser', undefined)
    console.log('There was no user')
  }
})

export const addFolder = function (folder) {
  if (store.state.user) {
    db.collection('users').doc(store.state.user.uid).collection('folders').add({ name: folder })
  }
  // const foldersColleciton = db.collection('folders')
  // return foldersColleciton.add(folder)
}

export const getFolders = function () {
  // addFolder('New Folder')
  if (store.state.user) {
    console.log('getting for ', store.state.user.uid)
    db.collection('users').doc(store.state.user.uid).collection('folders').get().then((querySnapshot) => {
      const folders = []
      querySnapshot.forEach((doc) => {
        console.log(doc)
        folders.push(doc.data().name)
      })
      store.dispatch('setFolders', folders)
    })
  }
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
