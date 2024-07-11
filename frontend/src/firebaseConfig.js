import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

let firebaseApp;
let firebaseStorage;

export const initializeFirebase = async () => {
  const response = await fetch('http://localhost:5001/api/firebase-config'); // Adjust the URL if needed
  const firebaseConfig = await response.json();

  firebaseApp = initializeApp(firebaseConfig);
  firebaseStorage = getStorage(firebaseApp);

  // Temporarily comment out analytics initialization
  // if (await isSupported()) {
  //   firebaseAnalytics = getAnalytics(firebaseApp);
  // }

  return { firebaseApp, firebaseStorage };
};

export const getFirebaseApp = () => firebaseApp;
export const getFirebaseStorage = () => firebaseStorage;
