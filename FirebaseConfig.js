import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgcOjJyBSTQqd8n49g0Pww6GthPNbyBv8",
  authDomain: "marketplacefastfood.firebaseapp.com",
  projectId: "marketplacefastfood",
  storageBucket: "marketplacefastfood.firebasestorage.app",
  messagingSenderId: "1037321327309",
  appId: "1:1037321327309:web:496f14fdb19dccd4e4cf84"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);