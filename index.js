// index.js
import { auth } from './firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

// ✅ Protect login page: redirect if already logged in
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "activities.html"; // go to activities page
  }
});

// DOM elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// ✅ Signup function
signupBtn.onclick = () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup successful!");
      emailInput.value = "";
      passwordInput.value = "";
      // redirect happens automatically via onAuthStateChanged
    })
    .catch(err => alert(err.message));
};

// ✅ Login function
loginBtn.onclick = () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful!");
      emailInput.value = "";
      passwordInput.value = "";
      // redirect happens automatically via onAuthStateChanged
    })
    .catch(err => alert(err.message));
};
