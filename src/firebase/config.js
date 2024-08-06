// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmm3beKNLSx3InLb4lMQJgA-m7KKNEej8",
  authDomain: "arcade-arena-1.firebaseapp.com",
  projectId: "arcade-arena-1",
  storageBucket: "arcade-arena-1.appspot.com",
  messagingSenderId: "658923790378",
  appId: "1:658923790378:web:5507d9699133c3ec032353"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
