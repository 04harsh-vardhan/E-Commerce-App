import { db, auth } from "../assets/firebase.js";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import type { ProductData } from "./types.js";

export const useUtils = () => {
  const uid = useUserUId();
  async function addToCart(product: ProductData) {
    const id = product.id.toString();
    await setDoc(doc(db, `users/${uid.value}/cart`, id), product);
  }
  async function getCart() {
    const querySnapshot = await getDocs(
      collection(db, `users/${uid.value}/cart`)
    );
    const cart: ProductData[] = [];
    querySnapshot.forEach((doc) => {
      cart.push(doc.data() as ProductData);
    });
  }
  async function getUserData() {
    const docRef = doc(db, "users", uid.value);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
  async function removeFromCart(id: number) {
    await deleteDoc(doc(db, `users/${uid.value}/cart`, id.toString()));
  }
  async function addUserToDB(userData: SignUpUser) {
    try {
      await setDoc(doc(db, "users", uid.value), {
        name: userData.name,
        email: userData.email,
        mobile_number: userData.mobile_number,
        address: userData.address,
        password: userData.password,
      });
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
      uid.value = response.user.uid;
      return true;
    } catch (err) {
      return false;
    }
  }
  async function signInUser(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      uid.value = response.user.uid;
      return true;
    } catch (err) {
      return false;
    }
  }
  class SignUpUser {
    name: string;
    email: string;
    mobile_number: string;
    address: string;
    password: string;
    constructor(
      name: string = "",
      email: string = "",
      mobile_number: string = "",
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
    removeFromCart,
    addUserToDB,
    createUser,
    signInUser,
    getUserData,
    getCart,
    SignUpUser,
  };
};
