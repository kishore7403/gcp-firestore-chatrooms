import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider,GithubAuthProvider} from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAodF_JJZPaIgpjHGd7eUnBpWqooShcFbE",
  authDomain: "chatroom-cdfc5.firebaseapp.com",
  projectId: "chatroom-cdfc5",
  storageBucket: "chatroom-cdfc5.appspot.com",
  messagingSenderId: "549176995674",
  appId: "1:549176995674:web:9b7b186b1ab23a5e9d4d63",
  measurementId: "G-6RC0SQ2BKE"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleprovider=new GoogleAuthProvider();
export const githubprovider= new GithubAuthProvider();
export const db = getFirestore(app);