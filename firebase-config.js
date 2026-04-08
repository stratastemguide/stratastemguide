import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOxth1Pd0AWmZQ5_XBvyOaUh31SmppRMQ",
  authDomain: "stratastemguide1.firebaseapp.com",
  projectId: "stratastemguide1",
  storageBucket: "stratastemguide1.firebasestorage.app",
  messagingSenderId: "250867824491",
  appId: "1:250867824491:web:aab687e43025c1ebb4fe2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
