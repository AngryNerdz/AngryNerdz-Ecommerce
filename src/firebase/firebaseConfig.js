
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


// const app = firebase.initializeApp({
//     apiKey: `${ process.env.REACT_APP_API_KEY }` ,
//     authDomain: `${ process.env.REACT_APP_AUTH_DOMAIN }` ,
//     projectId: `${ process.env.REACT_APP_PROJECT_ID }` ,
//     storageBucket: `${ process.env.REACT_APP_STORAGE_BUCKET }` ,
//     messagingSenderId: `${ process.env.REACT_APP_MESSAGING_SENDER_ID }` ,
//     appId: `${ process.env.REACT_APP_APP_ID }`
// });

export const getFirebase = () => {
    return app;
}

export const getFirestore = () => {
    return firebase.firestore(app);
};


