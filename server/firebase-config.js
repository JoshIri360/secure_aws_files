const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBep8mat3MQ-7-WpaZYTt_ZNj1qqAfGAcY",
  authDomain: "aws--files.firebaseapp.com",
  projectId: "aws--files",
  storageBucket: "aws--files.appspot.com",
  messagingSenderId: "499740251210",
  appId: "1:499740251210:web:3f08de54d8eed7cfa6c2b3",
  measurementId: "G-6F65FKRVPX",
};

initializeApp(firebaseConfig);

exports.db = getFirestore();
