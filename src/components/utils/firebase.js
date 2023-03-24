import firebase from "firebase/compat/app";
import {getDatabase,} from "firebase/compat/database"
import { getFirestore } from "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAt5QaMe4kVZxfdVSUXFB3wd6lpvt-26SU",
    authDomain: "shrimp-identification.firebaseapp.com",
    databaseURL: "https://shrimp-identification-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shrimp-identification",
    storageBucket: "shrimp-identification.appspot.com",
    messagingSenderId: "387181597120",
    appId: "1:387181597120:web:5b6f0e00426b81f5a63825",
    measurementId: "G-9RW54CJ8K4"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;