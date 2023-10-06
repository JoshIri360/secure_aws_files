import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD1Ivs9JDCiCyLcvtTt5prG1qkM50nuiCA",
//   authDomain: "mscproject-d1a20.firebaseapp.com",
//   projectId: "mscproject-d1a20",
//   storageBucket: "mscproject-d1a20.appspot.com",
//   messagingSenderId: "23936885170",
//   appId: "1:23936885170:web:76f66a1dfa0fbc039344ab"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBep8mat3MQ-7-WpaZYTt_ZNj1qqAfGAcY",
  authDomain: "aws--files.firebaseapp.com",
  projectId: "aws--files",
  storageBucket: "aws--files.appspot.com",
  messagingSenderId: "499740251210",
  appId: "1:499740251210:web:3f08de54d8eed7cfa6c2b3",
  measurementId: "G-6F65FKRVPX",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
