import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWrC4NNeZpkbsDnmFM4ZirY3uzJu_GDHA",
    authDomain: "logininventotrack.firebaseapp.com",
    projectId: "logininventotrack",
    storageBucket: "logininventotrack.appspot.com",
    messagingSenderId: "692002139318",
    appId: "1:692002139318:web:c627ac41ca3cc4b1d64a17"
};

export default initializeApp(firebaseConfig);
export const auth = getAuth();