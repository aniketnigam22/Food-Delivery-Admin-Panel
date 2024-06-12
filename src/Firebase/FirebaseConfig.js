import { initializeApp } from "firebase/app";

// this is the cloud firestorgae where you will store your data like a database and table
import { getFirestore } from "firebase/firestore";

// this is like a folder in firebase where you will store you image
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

//you are creating a db in firebase  and passing you app and app contain all the detail
const db = getFirestore(app)


// you are creating a storage for storing your image in firebase
const storage = getStorage(app)


//export them to use in AddFoodData.js
export {db, storage} ;