// RAAHI - Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, updateDoc, setDoc, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAE3QtMrJv-C7m7JQR3Gm7itCBYy9wbXVQ",
  authDomain: "raahi-7b57d.firebaseapp.com",
  projectId: "raahi-7b57d",
  storageBucket: "raahi-7b57d.firebasestorage.app",
  messagingSenderId: "1058427263914",
  appId: "1:1058427263914:web:b26539ebe578c90d6ae9d3",
  measurementId: "G-SR87DCNMVV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth helpers
export async function firebaseSignUp(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function firebaseSignIn(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function firebaseSignOut() {
  await signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Firestore helpers
export { collection, doc, getDocs, getDoc, addDoc, updateDoc, setDoc, query, where, orderBy, limit, serverTimestamp };
