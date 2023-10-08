// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYr6Oi-kAL69DNLY8sCwGIkRpArfLlBjE",
  authDomain: "vroom-401401.firebaseapp.com",
  projectId: "vroom-401401",
  storageBucket: "vroom-401401.appspot.com",
  messagingSenderId: "550744668475",
  appId: "1:550744668475:web:8734a6f7a762a3b9905f1e",
  measurementId: "G-KHHQ5KR2LF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage }


