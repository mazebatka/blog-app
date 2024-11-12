import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUpFunction = async (firstName, lastName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    });

    await setDoc(doc(usersCollection, user.uid), {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      photoUrl: user.photoUrl || "",
    });
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export const signInFunction = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutFunction = () => {
  return signOut(auth);
};

export const database = getFirestore(app);
export const usersCollection = collection(database, "users");
export const contactsCollection = collection(database, "contacts");
export const blogsCollection = collection(database, "blogs");
export const tagsCollection = collection(database, "tags");
