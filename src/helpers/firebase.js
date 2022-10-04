// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6_3Zal9ZO-wQtgvEc24-oxWF0Xu6K80g",
  authDomain: "programacion-90032.firebaseapp.com",
  projectId: "programacion-90032",
  storageBucket: "programacion-90032.appspot.com",
  messagingSenderId: "903578280735",
  appId: "1:903578280735:web:aab577a4bbb10291ed062a",
  measurementId: "G-CXXVZYJT1D"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);



// get path to file 
const getPathFile = (objResponseServer) => {
  const href = `https://firebasestorage.googleapis.com/v0/b/${objResponseServer.bucket}/o/${objResponseServer.fullPath}?alt=media&token=`;
};

export {
  appFireBase
}