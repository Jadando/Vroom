// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNkOMurHnWiRvZ_RCEWFv6S7cXbUg2F0M",
  authDomain: "vroom-dbd69.firebaseapp.com",
  projectId: "vroom-dbd69",
  storageBucket: "vroom-dbd69.appspot.com",
  messagingSenderId: "334270387845",
  appId: "1:334270387845:web:f59aec8bbcb424ddb43bec",
  measurementId: "G-03F3EVSVJ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);
export {app, auth ,db, storage}


