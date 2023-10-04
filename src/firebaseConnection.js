// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnkSVTvCB1DX6pTmGdo26JrWH7Fk1N5_s",
  authDomain: "tcc-ab7f2.firebaseapp.com",
  projectId: "tcc-ab7f2",
  storageBucket: "tcc-ab7f2.appspot.com",
  messagingSenderId: "627440962610",
  appId: "1:627440962610:web:221db8330d808e82ff002b",
  measurementId: "G-35VR4F2CFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage }


