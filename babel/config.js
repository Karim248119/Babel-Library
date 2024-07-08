// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVZh20mNQ2mbcfGuSnZiOkJpBG1WrMK3o",
  authDomain: "fir-7542d.firebaseapp.com",
  projectId: "fir-7542d",
  storageBucket: "fir-7542d.appspot.com",
  messagingSenderId: "295385910380",
  appId: "1:295385910380:web:0862a9c5c1bbc1b55adc49",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
