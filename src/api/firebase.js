import config from './firebase-config'
import firebase from 'firebase'
import 'firebase/firestore'
import store from '../store'

firebase.initializeApp(config)
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()

export const auth = firebase.auth()

export const googleSignin = () => {
  console.log('calling signinRedirect')
  auth.signInWithRedirect(googleProvider)// .then((response) => { console.log(response) }).catch(error => { console.log(error) })
}
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
let getFolderNotesId
auth.onAuthStateChanged(function (user) {
  if (user) {
    user.getIdToken().then((accessToken) => {
      store.dispatch('setUserState', 'LOGGEDIN')
      store.dispatch('setUser', JSON.parse(JSON.stringify(user)))
      folderWatchHandler = setFolderWatch()
      if (getFolderNotesId) {
        queryNotes(getFolderNotesId)
      }
    })
  } else {
    store.dispatch('setUserState', 'LOGGEDOUT')
    folderWatchHandler && folderWatchHandler()
  }
})

auth.getRedirectResult().then(function (result) {
  if (result.credential) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken
    // ...
  }
  // The signed-in user info.
  console.log('logged in from Google')
  store.dispatch('setUserState', 'LOGGEDIN')
  store.dispatch('setUser', JSON.parse(JSON.stringify(result.user)))
  folderWatchHandler = setFolderWatch()
  if (getFolderNotesId) {
    queryNotes(getFolderNotesId)
  }
})

function setFolderWatch () {
  return db.collection('users').doc(auth.currentUser.uid).collection('folders').onSnapshot((querySnapshot) => {
    const folders = []
    querySnapshot.forEach((doc) => {
      folders.push(
        {
          name: doc.data().name,
          id: doc.id
        }
      )
    }, function (error) {
      console.log('Snapshot error', error)
    })
    if (folders.length === 0) {
      addFolder('New Folder')
    }
    store.dispatch('setFolders', folders)
  })
}

let noteWatchHandler = {}
export function queryNotes (folderId) {
  if (!auth.currentUser) {
    getFolderNotesId = folderId
  } else if (!noteWatchHandler[folderId]) {
    getFolderNotesId = undefined
    noteWatchHandler[folderId] = db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(folderId)
      .collection('notes').onSnapshot((querySnapshot) => {
        const notes = []
        querySnapshot.forEach((note) => {
          notes.push(JSON.parse(JSON.stringify({id: note.id, ...note.data()})))
        })
        store.dispatch('setNotes', {folderId, notes})
      })
  }
}

export function updateFolderName (id, name) {
  db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(id).set({ name: name })
}

export function addFolder (name) {
  db.collection('users').doc(auth.currentUser.uid).collection('folders').add({ name: name })
}

export function removeFolder (folder) {
  db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(folder.id).delete()
}

export function addNote (folderId) {
  db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(folderId).collection('notes').add(
    {
      title: '',
      note: '',
      created: new Date(),
      lastEdited: new Date(),
      shared: false,
      encrypted: false
    }
  ).then((result) => {
    // console.log('added', result)
  })
}

export function setNote ({folderId, noteId, note, title}) {
  auth.currentUser && auth.currentUser.uid && db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(folderId).collection('notes').doc(noteId).update({
    note,
    title,
    lastEdited: new Date()
  }).then((result) => {
    // console.log('setting result', result)
  }, (error) => {
    console.log('setting error', error)
  })
}

export function deleteNote (folderId, noteId) {
  db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(folderId).collection('notes').doc(noteId).delete()
}

export function updateNote (folderId, note) {
  db.collection('users').doc(auth.currentUser.uid).collection('folders').doc(folderId).collection('notes').doc(note.id).set(note)
}
