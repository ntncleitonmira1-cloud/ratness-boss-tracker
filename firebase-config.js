// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKsFvEAwO4C80XIxhuTq6weSJn8ba9DUs",
  authDomain: "ratnessbosstracker.firebaseapp.com",
  projectId: "ratnessbosstracker",
  storageBucket: "ratnessbosstracker.firebasestorage.app",
  messagingSenderId: "575662012006",
  appId: "1:575662012006:web:97359d089f149b42489fa7",
  measurementId: "G-VBX6BJXWZ6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
