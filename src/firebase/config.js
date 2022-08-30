import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBOa_UV20w6qew4peHPTNpc2KNUUAYNjSA",
    authDomain: "figuritasmundial-f6159.firebaseapp.com",
    projectId: "figuritasmundial-f6159",
    storageBucket: "figuritasmundial-f6159.appspot.com",
    messagingSenderId: "621789401665",
    appId: "1:621789401665:web:92f268caf23431dca36cc0"
  };
  
 app.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();