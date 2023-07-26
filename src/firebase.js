import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsVnuVnmCuweeIBKICtDAasLNh1U_itwk",
  authDomain: "expence-f77bd.firebaseapp.com",
  projectId: "expence-f77bd",
  storageBucket: "expence-f77bd.appspot.com",
  messagingSenderId: "388967268436",
  appId: "1:388967268436:web:81473561d6c9aecc72adc1"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
