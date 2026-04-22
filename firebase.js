import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC8W9M97Alc5FZAGEVTlC95n0c4NNmnPiU",
  authDomain: "isam-dev-studio.firebaseapp.com",
  projectId: "isam-dev-studio",
  storageBucket: "isam-dev-studio.firebasestorage.app",
  messagingSenderId: "142452422090",
  appId: "1:142452422090:web:5b3fcef24c280d7edf8b33"
};

// INIT
const app = initializeApp(firebaseConfig);

// EXPORTS
export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
};