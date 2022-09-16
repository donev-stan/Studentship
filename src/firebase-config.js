import { getFirestore } from "@firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF8SPHyXPVgvFh6ZbadhxHTFJTzf8AJos",
  authDomain: "studentship-react-558ce.firebaseapp.com",
  projectId: "studentship-react-558ce",
  storageBucket: "studentship-react-558ce.appspot.com",
  messagingSenderId: "139990529419",
  appId: "1:139990529419:web:fead40e511ab256f15eb8e",
  measurementId: "G-QE0S4EPHWS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
