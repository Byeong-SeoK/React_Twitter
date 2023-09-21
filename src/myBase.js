import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
//firebase 내부는 collection과 document로 이루어져있다.
//collection은 폴더라 볼 수 있고 document는 collection안에 들어있는 파이렝 해당한다.

// Initialize Firebase
initializeApp(firebaseConfig);

export const authService = getAuth();
//firebase를 다른 컴포넌트에서 사용할 때 마다 Auth를 호출해야하는데
//매번 Auth를 호출하기 보다는 firebase.js에서 호출한 것에 대해
//export를 하고 컴포넌트에서 가져도 쓰게 만드는 것이 좋다.

export const dbService = getFirestore();
