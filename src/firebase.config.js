// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKY60I7_JdEMCv_BeZd82HkxjYAsnrUfE",
  authDomain: "supply-chain-management-e1f24.firebaseapp.com",
  projectId: "supply-chain-management-e1f24",
  storageBucket: "supply-chain-management-e1f24.appspot.com",
  messagingSenderId: "754101587671",
  appId: "1:754101587671:web:2090b91d006d50feee2a92",
  measurementId: "G-8VTTPB62P1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
