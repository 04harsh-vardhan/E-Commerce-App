import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBPvZnGD79SSXwEvf6kk6GtYrGnW9eBcs0",
  authDomain: "buyzone-f6497.firebaseapp.com",
  projectId: "buyzone-f6497",
  storageBucket: "buyzone-f6497.appspot.com",
  messagingSenderId: "219322574599",
  appId: "1:219322574599:web:3e8177b70f5b5d7fc147a2",
  measurementId: "G-X4YLWDRBC5",
  databaseURL: "https://buyzone-f6497-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);