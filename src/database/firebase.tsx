import firebase from 'firebase';
import { firebaseConfig as config } from './config';

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.API_KEMEASUREMENT_IDY,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
