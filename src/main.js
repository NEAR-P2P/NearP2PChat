import Vue from 'vue'
import App from './App.vue'
//import firebase from 'firebase'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Conexion a la Base de datos Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyCEDG7t9UpmiNWsjPyd_rwucL_s2ppexLk",
    authDomain: "chat-near-dex.firebaseapp.com",
    databaseURL: "https://chat-near-dex-default-rtdb.firebaseio.com",
    projectId: "chat-near-dex",
    storageBucket: "chat-near-dex.appspot.com",
    messagingSenderId: "601318580099",
    appId: "1:601318580099:web:ea212ac3d89f8ef24ae0b6"
  };

  //Inicializacion de la base de datos
firebase.initializeApp(firebaseConfig)

// Autentificacion de manera anonima con firebase
firebase.auth().onAuthStateChanged(() => new Vue({
  render: h => h(App),
}).$mount('#app'))

// Exportacion de las librerias
export const db = firebase.firestore();
export const storage = firebase.storage();
//export const storage = firebase.firestore();