import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmfbjwsLH3sVDb8yiL0lWH3-GqYit2R_8",
  authDomain: "netflix-clone-a59e5.firebaseapp.com",
  projectId: "netflix-clone-a59e5",
  storageBucket: "netflix-clone-a59e5.appspot.com",
  messagingSenderId: "71015631166",
  appId: "1:71015631166:web:15991a21835f666035446f"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);