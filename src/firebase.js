// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-mFG8kVjCXqwQkNxUw0x_WGlvlKwijns",
  authDomain: "eventapp-6524a.firebaseapp.com",
  projectId: "eventapp-6524a",
  storageBucket: "eventapp-6524a.appspot.com",
  messagingSenderId: "484510317077",
  appId: "1:484510317077:web:c51b2c81e93c5f8456ac1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);