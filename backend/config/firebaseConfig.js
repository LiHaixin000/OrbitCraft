// backend/congig/firebaseConfig.js
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0HWQWN_wjhHqOCFCTu2XygkZilLHwV6s",
  authDomain: "orbitcraft-c1bd7.firebaseapp.com",
  projectId: "orbitcraft-c1bd7",
  storageBucket: "orbitcraft-c1bd7.appspot.com",
  messagingSenderId: "782428494027",
  appId: "1:782428494027:web:dbca84d5d93348b692234e",
  measurementId: "G-KMKB4BGCTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { app, firebaseConfig, storage };



