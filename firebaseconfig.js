// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtCU1hJZISosQpsZ0wAQMvyT3oWNxbo6k",
  authDomain: "info-6132-01-lab2.firebaseapp.com",
  projectId: "info-6132-01-lab2",
  storageBucket: "info-6132-01-lab2.appspot.com",
  messagingSenderId: "233958564805",
  appId: "1:233958564805:web:b09e825d2cb0a677fb61ac"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
