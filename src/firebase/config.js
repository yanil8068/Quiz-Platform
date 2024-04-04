import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwcBN-hOcXg6lFDWIE40a-BjZBQI5UQOA",
  authDomain: "booklist-with-firebase-25722.firebaseapp.com",
  projectId: "booklist-with-firebase-25722",
  storageBucket: "booklist-with-firebase-25722.appspot.com",
  messagingSenderId: "255281672707",
  appId: "1:255281672707:web:dcb0da7a06d089f11f9436",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
