import { app } from "../assets/firebase.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
const db = getFirestore(app);

export const useUtils = () => {
  async function addToCart(userDocId: string, product: ProductData) {
    const result = await addDoc(
      collection(db, `users/${userDocId}/cart`),
      product
    );
  }
  async function addUserToDB(userData: SignUpUser) {
    try {
      await addDoc(collection(db, "users"), userData);
      return true;
    } catch (err) {
      return false;
    }
  }
  async function createUser(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return true;
    } catch (err) {
      return false;
    }
  }
  class SignUpUser {
    name: string;
    email: string;
    mobile_number: number;
    address: string;
    password: string;
    constructor(
      name: string = "",
      email: string = "",
      mobile_number: number = 0,
      address: string = "",
      password: string = ""
    ) {
      this.name = name;
      this.email = email;
      this.mobile_number = mobile_number;
      this.address = address;
      this.password = password;
    }
  }
  return {
    addToCart,
    addUserToDB,
    createUser,
    SignUpUser,
  };
};
