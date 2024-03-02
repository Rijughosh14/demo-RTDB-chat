// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/database";
import "firebase/compat/firestore";


// import 'firebase/compat/auth';
// import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "../config/FireBase";
//  import { getAuth } from "firebase/auth"

// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(FirebaseApp);
//  export const auth=getAuth(FirebaseApp);


// Initialize Cloud Firestore and get a reference to the service
export const firestoredb = firebase.firestore();

export default firebase