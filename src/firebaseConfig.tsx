import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCzHfptWC5xX2UOlCZJod93BDEmFTFTtqU",
//   authDomain: "dev-oriole-2.firebaseapp.com",
//   projectId: "dev-oriole-2",
//   storageBucket: "dev-oriole-2.appspot.com",
//   messagingSenderId: "98222249197",
//   appId: "1:98222249197:web:3ff2320a10ee5c7005a8e4",
//   measurementId: "G-K9X753T88C"
// };

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);

export const logOut = async () => {
  console.log("logging out...");
  const auth = getAuth();
  await signOut(auth);
};
