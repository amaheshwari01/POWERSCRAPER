// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDm8o4auWuVcXq91LHvs1pgaTnuESjnWo",
    authDomain: "powerscraper-6c5f6.firebaseapp.com",
    databaseURL: "https://powerscraper-6c5f6-default-rtdb.firebaseio.com",
    projectId: "powerscraper-6c5f6",
    storageBucket: "powerscraper-6c5f6.appspot.com",
    messagingSenderId: "782869327327",
    appId: "1:782869327327:web:9bd4bb0d1e677b81f3e86a",
    measurementId: "G-9V8X06993T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);
