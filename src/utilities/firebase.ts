// Firebase setup and utility functions
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  // TODO: Add your Firebase config here
  // Example:
  // apiKey: 'YOUR_API_KEY',
  // authDomain: 'YOUR_AUTH_DOMAIN',
  // databaseURL: 'YOUR_DATABASE_URL',
  // projectId: 'YOUR_PROJECT_ID',
  // storageBucket: 'YOUR_STORAGE_BUCKET',
  // messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  // appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider);
};
