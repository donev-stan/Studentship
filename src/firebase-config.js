// Importing functions I need from the SDKs I need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAsVrdMLuDYGrw32bXuzdv4FjigMRKeLtk",
	authDomain: "studentship-fe7e8.firebaseapp.com",
	projectId: "studentship-fe7e8",
	storageBucket: "studentship-fe7e8.appspot.com",
	messagingSenderId: "863269497156",
	appId: "1:863269497156:web:b8d458238380f4b2080f11",
	measurementId: "G-WCHBXRXQXN",
};

// const firebaseConfig = {
// 	apiKey: process.env.FIREBASE_API_KEY,
// 	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.FIREBASE_SENDER_ID,
// 	appId: process.env.FIREBASE_APP_ID,
// 	measurementId: process.env.FIREBASE_MEASIREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect to Firebase
export const db = getFirestore(app);