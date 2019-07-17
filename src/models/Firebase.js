import firebase from 'firebase'
import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyDSnpjJslwZWdRs5hB-qNeWXM3IN25CxrU",
  authDomain: "scanlink-f2173.firebaseapp.com",
  databaseURL: "https://scanlink-f2173.firebaseio.com",
  projectId: "scanlink-f2173",
  storageBucket: "scanlink-f2173.appspot.com",
  messagingSenderId: "720917761648",
  appId: "1:720917761648:web:85b4f27af9d88b6e"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const database = firebase.firestore();