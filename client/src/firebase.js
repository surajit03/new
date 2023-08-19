import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9_EAXmE8tjHbTeTuieWzp_MstZIy5Cms",
  authDomain: "uploadimg-7867e.firebaseapp.com",
  projectId: "uploadimg-7867e",
  storageBucket: "uploadimg-7867e.appspot.com",
  messagingSenderId: "245187626179",
  appId: "1:245187626179:web:2fd77461a50649903fce76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;