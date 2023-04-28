// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// const firebaseKey = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID,
// };

// const firebaseConfig = {
//   apiKey: firebaseKey.apiKey,
//   authDomain: firebaseKey.authDomain,
//   projectId: firebaseKey.projectId,
//   storageBucket: firebaseKey.storageBucket,
//   messagingSenderId: firebaseKey.messagingSenderId,
//   appId: firebaseKey.appId,
//   measurementId: firebaseKey.measurementId,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAxfMdKGGctBLOfEoF0c6pVBQz9d2rsXJo",
  authDomain: "delaynt-31feb.firebaseapp.com",
  databaseURL:
    "https://delaynt-31feb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "delaynt-31feb",
  storageBucket: "delaynt-31feb.appspot.com",
  messagingSenderId: "718809924657",
  appId: "1:718809924657:web:fea9a52073e069c00ec110",
  measurementId: "G-7WY7EN52E5",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore();
export const databaseRealtime = getDatabase();
export const storage = getStorage(app, "gs://delaynt-31feb.appspot.com");
