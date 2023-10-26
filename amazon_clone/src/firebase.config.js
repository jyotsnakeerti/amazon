// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBU3fZW39bbcCqn8YDVFPsULFzD2X3rkSA",
  authDomain: "test-901f1.firebaseapp.com",
  projectId: "test-901f1",
  storageBucket: "test-901f1.appspot.com",
  messagingSenderId: "400649710931",
  appId: "1:400649710931:web:c5550fd8d785f1a70b05a6",
  measurementId: "G-XCCL4W16LP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBU3fZW39bbcCqn8YDVFPsULFzD2X3rkSA",
//   authDomain: "test-901f1.firebaseapp.com",
//   projectId: "test-901f1",
//   storageBucket: "test-901f1.appspot.com",
//   messagingSenderId: "400649710931",
//   appId: "1:400649710931:web:c5550fd8d785f1a70b05a6",
//   measurementId: "G-XCCL4W16LP"
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig)

// export const db= firebaseApp.firestore()
// export const auth = firebase.auth();

// export default firebase