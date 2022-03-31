// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOu8OkC440BQQ3GfDYd2Hu6YiKznP8Wi4",
  authDomain: "where-s-waldo-d8f4c.firebaseapp.com",
  projectId: "where-s-waldo-d8f4c",
  storageBucket: "where-s-waldo-d8f4c.appspot.com",
  messagingSenderId: "1079565679743",
  appId: "1:1079565679743:web:d39aaa6148f411db78d34a"
};

// Initialize Firebase
export function initFirebase() {
    initializeApp(firebaseConfig);
};