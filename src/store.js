import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const fbConfig = {
    apiKey: "AIzaSyCh-hIjosGnrc0XbRz6O_7zf1g10o8PI94",
    authDomain: "react-back-to-front.firebaseapp.com",
    databaseURL: "https://react-back-to-front.firebaseio.com",
    projectId: "react-back-to-front",
    storageBucket: "react-back-to-front.appspot.com",
    messagingSenderId: "1030507328765",
    appId: "1:1030507328765:web:ae12fd0a3994e5da013a94",
    measurementId: "G-M3JS6NHL2L"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer,
})

if (localStorage.getItem('settings') == null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// Create store with reducers and initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem('settings'))
}
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}

export { store, rrfProps };
