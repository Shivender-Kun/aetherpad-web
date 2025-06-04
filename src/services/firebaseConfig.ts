// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE } from "@/constants";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: FIREBASE.API_KEY,
  authDomain: FIREBASE.AUTH_DOMAIN,
  projectId: FIREBASE.PROJECT_ID,
  storageBucket: FIREBASE.STORAGE_BUCKET,
  messagingSenderId: FIREBASE.MESSAGING_SENDER_ID,
  appId: FIREBASE.APP_ID,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const db = getFirestore(firebase);
export const auth = getAuth(firebase);
const storage = getStorage(firebase);

export { storage };

export default firebase;
