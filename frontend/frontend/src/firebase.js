import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1XlSZRSwhEcTlFjS1yQRQ8Ux1UArDQ7k",
  authDomain: "proo-140c3.firebaseapp.com",
  projectId: "proo-140c3",
  storageBucket: "proo-140c3.firebasestorage.app",
  messagingSenderId: "32884276003",
  appId: "1:32884276003:web:d4eaeef06b64b4914b6a96",
  measurementId: "G-Q39PYY62NG"
};
const app =
  initializeApp(firebaseConfig);

export const auth = getAuth(app);