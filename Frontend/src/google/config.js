// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATC4q6RDehb_rKg1W9Shht7imrazsbg28",
  authDomain: "researchnotes-416909.firebaseapp.com",
  projectId: "researchnotes-416909",
  storageBucket: "researchnotes-416909.appspot.com",
  messagingSenderId: "37662493405",
  appId: "1:37662493405:web:82b77aaea063b7a4daa934"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider;

export {auth,provider};