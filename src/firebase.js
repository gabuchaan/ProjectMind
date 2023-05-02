// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getStorage } from "firebase/storage";
// import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// -------------------- Project Mind -----------------------
// const firebaseApp = firebase.initializeApp( {
//   apiKey: "AIzaSyAbeEiLSz597a7rHRm1j99QijyGshvW7FA",
//   authDomain: "projectmind-50773.firebaseapp.com",
//   projectId: "projectmind-50773",
//   storageBucket: "projectmind-50773.appspot.com",
//   messagingSenderId: "1066467749405",
//   appId: "1:1066467749405:web:e2d933a8cf5b0d3b89e0f4",
//   measurementId: "G-VFW1D8MMDB",
//   // storageBucket: 'gs://projectmind-50773.appspot.com',
// });

// -------------------- Project Test -----------------------
const firebaseApp = firebase.initializeApp( {
apiKey: "AIzaSyDbBtl1Yb_XeYMi9Bj0DibVT8GPBGdpsGU",
  authDomain: "project-test-c45d4.firebaseapp.com",
  projectId: "project-test-c45d4",
  storageBucket: "gs://project-test-c45d4.appspot.com",
  messagingSenderId: "193267880581",
  appId: "1:193267880581:web:e89f7df1101a6d882d4fec"
});

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = getStorage(firebaseApp);
export { db, auth, storage }