// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/storage';
import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM1ae2gcE_5VcSO8TXtRvYqW5fPFsbUdg",
  authDomain: "angrynerdz.firebaseapp.com",
  databaseURL: "https://angrynerdz-default-rtdb.firebaseio.com",
  projectId: "angrynerdz",
  storageBucket: "angrynerdz.appspot.com",
  messagingSenderId: "176358204667",
  appId: "1:176358204667:web:9f06cd54b22dc89ab47c5e",
  measurementId: "G-JG3QF42G32"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const almacenamiento = app.storage();

const appProducto = firebase.initializeApp(firebaseConfig);
const dbProducto = getFirestore(appProducto);



const auth = app.auth();
auth.languageCode = 'es_419';



const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.assign("/");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (nombre, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await user.sendEmailVerification();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  window.location.assign("/");
  auth.signOut();
};



export {db,app, almacenamiento,dbProducto,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,auth};
