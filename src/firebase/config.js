import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
 // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgfqhFvuA5YxvsboOiw2sJj8l30f7B2V0",
    authDomain: "photo-gallery-21f99.firebaseapp.com",
    projectId: "photo-gallery-21f99",
    storageBucket: "photo-gallery-21f99.appspot.com",
    messagingSenderId: "283791211916",
    appId: "1:283791211916:web:689c19ee2a0a01b3822aa9"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectStorage, projectFirestore, timestamp};