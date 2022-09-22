
//Inicializacion de Firebase/Firestore
import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';

require("dotenv").config()

const app = firebase.initializeApp({
    apiKey: "AIzaSyAM1ae2gcE_5VcSO8TXtRvYqW5fPFsbUdg",
    authDomain: "angrynerdz.firebaseapp.com",
    databaseURL: "https://angrynerdz-default-rtdb.firebaseio.com",
    projectId: "angrynerdz",
    storageBucket: "angrynerdz.appspot.com",
    messagingSenderId: "176358204667",
    appId: "1:176358204667:web:9f06cd54b22dc89ab47c5e",
    measurementId: "G-JG3QF42G32"
});

export const getFirebase = () => {
    return app;
}

export const getFirestore = () => {
    return firebase.firestore(app);
};


