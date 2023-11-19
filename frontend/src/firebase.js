/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
const firebaseConfig = {
  apiKey: "AIzaSyAlJEL1S7kFbMgR0Vb-RMvbl2dVo2eMzx8",
  authDomain: "podcast-3341f.firebaseapp.com",
  projectId: "podcast-3341f",
  storageBucket: "podcast-3341f.appspot.com",
  messagingSenderId: "54213931063",
  appId: "1:54213931063:web:9f6544265dabb230f68fb2",
  measurementId: "G-G36WHDVZ02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
