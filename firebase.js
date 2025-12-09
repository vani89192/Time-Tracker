// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {  
   apiKey: "AIzaSyAgW4D4EU6yjuP5DgJSVqu7O-xbz-6Kzq0",
  authDomain: "time-tracker-545dd.firebaseapp.com",
  projectId: "time-tracker-545dd",
  storageBucket: "time-tracker-545dd.firebasestorage.app",
  messagingSenderId: "464736406888",
  appId: "1:464736406888:web:592655292d5bc5e41ddadd",
  measurementId: "G-E7GLDL4N5B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
