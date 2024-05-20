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
  getAuth,
  signOut,
} from "firebase/auth";
import type { ProductData } from "./types.js";
import { useToast } from "vue-toastification";

export const useUtils = () => {
  const uid = useUserUId();
  const toast = useToast();
  async function addToCart(product: ProductData) {
    try {
      const id = product.id.toString();
      await setDoc(doc(db, `users/${uid.value}/cart`, id), product);
      toast("Product added to cart");
    } catch (err) {
      toast("Something went wrong");
    }
  }
  async function getCart() {
    const userCart = useUserCart();
    userCart.value = [];
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${uid.value}/cart`)
      );
      querySnapshot.forEach((doc) => {
        userCart.value.push(doc.data() as ProductData);
      });
    } catch (err) {
      // toast("USer Has no item in cart");
    }
  }
  async function getProducts() {
    const querySnapshot: any = await getDocs(collection(db, "products"));
    let response: any;
    querySnapshot.forEach((doc: any) => {
      response = doc.data().data;
    });
    return response;
  }
  async function getUserData() {
    const docRef = doc(db, "users", uid.value);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
  async function removeFromCart(id: number) {
    await deleteDoc(doc(db, `users/${uid.value}/cart`, id.toString()));
    toast("Product removed from cart");
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
      const auth1 = getAuth();
      console.log("auth  ", auth);
      console.log("response  ", response);
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
    confirmPassword: string;
    constructor(
      name: string = "",
      email: string = "",
      mobile_number: string = "",
      address: string = "",
      password: string = "",
      confirmPassword = ""
    ) {
      this.name = name;
      this.email = email;
      this.mobile_number = mobile_number;
      this.address = address;
      this.password = password;
      this.confirmPassword = confirmPassword;
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
    getProducts,
    SignUpUser,
  };
};
