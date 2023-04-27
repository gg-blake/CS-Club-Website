// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSTG6-yuTAlxFMR4rgzeZUnIO15t6n1z4",
  authDomain: "umb-cs-club-site.firebaseapp.com",
  projectId: "umb-cs-club-site",
  storageBucket: "umb-cs-club-site.appspot.com",
  messagingSenderId: "804865108897",
  appId: "1:804865108897:web:120f3931cee1f4549439e0",
  measurementId: "G-GJQS3PES57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth };