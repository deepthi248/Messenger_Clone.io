import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {

    apiKey: "AIzaSyAtztlSmKPZsNj-V57MUFt2NgavW9SmKzk",
    authDomain: "messenger-clone-dc892.firebaseapp.com",
    projectId: "messenger-clone-dc892",
    storageBucket: "messenger-clone-dc892.appspot.com",
    messagingSenderId: "277014886190",
    appId: "1:277014886190:web:3f725f4dc1d04248c2acbf",
    measurementId: "G-0RKHRNKVG4"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;