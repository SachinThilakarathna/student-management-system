// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApnniYDaNhK-_jE1g5uf8sAzQW3gU8g64",
    authDomain: "student-management-syste-7f36d.firebaseapp.com",
    projectId: "student-management-syste-7f36d",
    storageBucket: "student-management-syste-7f36d.firebasestorage.app",
    messagingSenderId: "975176063652",
    appId: "1:975176063652:web:db34bc116557da2cd26431",
    measurementId: "G-DTWML6TYP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
