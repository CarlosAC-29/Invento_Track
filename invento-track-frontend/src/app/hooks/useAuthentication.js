import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { initializeApp } from 'firebase/app';   

const firebaseConfig = {
  apiKey: "AIzaSyAWrC4NNeZpkbsDnmFM4ZirY3uzJu_GDHA",
  authDomain: "logininventotrack.firebaseapp.com",
  projectId: "logininventotrack",
  storageBucket: "logininventotrack.appspot.com",
  messagingSenderId: "692002139318",
  appId: "1:692002139318:web:c627ac41ca3cc4b1d64a17"
};

const app = initializeApp(firebaseConfig);
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      (user) => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};

const checkAuthentication = async () => {
    const currentUser = await getCurrentUser();
    console.log('soy el current user', !!currentUser)
    return !!currentUser;
};

export default checkAuthentication;
