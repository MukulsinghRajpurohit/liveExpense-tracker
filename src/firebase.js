import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7FWMXOdCqb1yFLuNiBXI43iHCQYBGFig",
  authDomain: "promp321-d0c2e.firebaseapp.com",
  projectId: "promp321-d0c2e",
  storageBucket: "promp321-d0c2e.appspot.com",
  messagingSenderId: "17051114348",
  appId: "1:17051114348:web:2a6bacfd1e541138e17149",
  measurementId: "G-EF1FBBP4JE"
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
