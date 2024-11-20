import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4dAvjPReMf6kriA6d1uzx2wUYDaYE1To",
  authDomain: "zealthy-onboarding.firebaseapp.com",
  projectId: "zealthy-onboarding",
  storageBucket: "zealthy-onboarding.appspot.com",
  messagingSenderId: "51457594787",
  appId: "1:51457594787:web:7c8b3d82fad763a9d87616",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;