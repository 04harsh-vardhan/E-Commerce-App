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
  sendPasswordResetEmail,
} from "firebase/auth";
import type { ProductData } from "./types.js";
import { useToast } from "vue-toastification";

export const useUtils = () => {
  const uid = useUserUId();
  const toast = useToast();
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
    const querySnapshot: any = await getDocs(collection(db, "products"));
    let response: ProductData[] = [];
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
      uid.value = response.user.uid;
      const time = response.user.metadata.lastSignInTime;
      if (time) {
        localStorage.setItem(
          "token",
          (new Date(time).getTime() + 3600000).toString()
        );
      }
      debugger;
      return true;
    } catch (err) {
      return false;
    }
  }
  async function signoutUser() {
    try {
      const response = await signOut(auth);
      localStorage.removeItem("token");
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
  function checkAuthentication(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      return Number(token) - new Date().getTime() > 0 ? true : false;
    }
    return false;
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
    checkAuthentication,
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
