import { db, auth } from "../assets/firebase.js";
import {
  setDoc,
  doc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import type { ProductData } from "./types.js";
import { useToast } from "vue-toastification";

export const useUtils = () => {
  const uid = useUserUId();
  const toast = useToast();

  async function updateProductQuantity(id: string, newQuantity: number) {
    const db = getDatabase();
    await set(ref(db, "products/" + id + "/quantity"), newQuantity);
  }

  function attachEventOnProdQuantity(id: string, quantity: Ref) {
    const db = getDatabase();
    const quantityRef = ref(db, "products/" + id + "/quantity");
    const unsubscribe =  onValue(quantityRef, (snapshot) => {
      quantity.value = snapshot.val();
    });
    return unsubscribe
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Reset Password Link Sent to your email");
    } catch (error: any) {
      toast(error.message);
    }
  }
  async function addToCart(product: ProductData) {
    try {
      const id = product.id.toString();
      await setDoc(doc(db, `users/${uid.value}/cart`, id), product);
      toast("Product added to cart");
    } catch (err) {
      toast("Something went wrong");
    }
  }
  async function addToWishlist(product: ProductData) {
    try {
      const id = product.id.toString();
      await setDoc(doc(db, `users/${uid.value}/wishlist`, id), product);
      toast("Product added to wishlist");
    } catch (err) {
      toast("Something went wrong");
    }
  }
  async function getCart(): Promise<ProductData[]> {
    const cartArray: ProductData[] = [];
    const querySnapshot = await getDocs(
      collection(db, `users/${uid.value}/cart`)
    );
    querySnapshot.forEach((doc) => {
      cartArray.push(doc.data() as ProductData);
    });
    return cartArray;
  }
  async function getWishlist(): Promise<ProductData[]> {
    const wishlistArray: ProductData[] = [];
    const querySnapshot = await getDocs(
      collection(db, `users/${uid.value}/wishlist`)
    );
    querySnapshot.forEach((doc) => {
      wishlistArray.push(doc.data() as ProductData);
    });
    return wishlistArray;
  }
  async function getProducts() {
    const dbRef = ref(getDatabase());
    const querySnapshot: any = await get(child(dbRef, "products"));
    let response: ProductData[] = [];
    querySnapshot.val().forEach((item: ProductData) => {
      response.push(item);
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
  async function removeFromWishlist(id: number) {
    await deleteDoc(doc(db, `users/${uid.value}/wishlist`, id.toString()));
    toast("Product removed from wishlist");
  }
  async function addUserToDB(userData: SignUpUser) {
    try {
      await setDoc(doc(db, "users", uid.value), {
        name: userData.name,
        email: userData.email,
        mobileNumber: userData.mobileNumber,
        address: userData.address,
        image: userData.image,
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
      return true;
    } catch (err) {
      return false;
    }
  }
  async function signInUser(email: string, password: string) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (err) {
      return false;
    }
  }
  async function signoutUser() {
    try {
      const response = await signOut(auth);
      toast("Signout Success");
    } catch (err) {}
  }
  function imageToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  class SignUpUser {
    name: string;
    email: string;
    mobileNumber: string;
    address: string;
    image: string;
    constructor(
      name: string,
      email: string,
      mobileNumber: string,
      address: string,
      image: string = ""
    ) {
      this.name = name;
      this.email = email;
      this.mobileNumber = mobileNumber;
      this.address = address;
      this.image = image;
    }
  }

  return {
    attachEventOnProdQuantity,
    updateProductQuantity,
    resetPassword,
    imageToBase64,
    addToCart,
    removeFromCart,
    removeFromWishlist,
    addUserToDB,
    createUser,
    signInUser,
    getUserData,
    getCart,
    getProducts,
    signoutUser,
    addToWishlist,
    getWishlist,
    SignUpUser,
  };
};
