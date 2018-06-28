import firebase from "firebase";
console.log(process.env)
// https://firebase.google.com/docs/web/setup?authuser=0
 
// See firebase setup in above google firebase documentation url
export const config = {
    apiKey: "AIzaSyC1h8VmeMLmgOjp7Grj-m4fxAF_hpY7Tkg",
    authDomain: "trailerpark2-29337.firebaseapp.com",
    databaseURL: "https://trailerpark2-29337.firebaseio.com",
    projectId: "trailerpark2-29337",
    storageBucket: "trailerpark2-29337.appspot.com",
    messagingSenderId: "700594973332"
};
 
firebase.initializeApp(config);
 
export default firebase;

// apiKey: process.env.REACT_APP_FIREBASE_KEY,
// authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
// databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
// projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
// storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// REACT_APP_FIREBASE_KEY=AIzaSyC1h8VmeMLmgOjp7Grj-m4fxAF_hpY7Tkg

