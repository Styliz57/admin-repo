import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: "learnstack-1ba50",
  storageBucket: "learnstack-1ba50.appspot.com",
  messagingSenderId: "995901344717",
  appId: "1:995901344717:web:d48e96e9041ff408d8d284",
  measurementId: "G-E39N55JP2P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics and Firestore
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
