import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCB3bKjxCVw4d-Miwh8-8UO3i2eaNkGi50",
  authDomain: "food-delivery-app-1ab15.firebaseapp.com",
  projectId: "food-delivery-app-1ab15",
  storageBucket: "food-delivery-app-1ab15.appspot.com",
  messagingSenderId: "219053985271",
  appId: "1:219053985271:web:c47bd2b394c7e9b5a872f2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const storage = getStorage(app)

export {db, storage} ;