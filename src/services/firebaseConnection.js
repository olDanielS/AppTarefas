import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDsBFNcEE7_MTt4FIwu_wgNiYvbTXpqzwc",
  authDomain: "tarefas-f68ac.firebaseapp.com",
  databaseURL: "https://tarefas-f68ac-default-rtdb.firebaseio.com",
  projectId: "tarefas-f68ac",
  storageBucket: "tarefas-f68ac.appspot.com",
  messagingSenderId: "445624057016",
  appId: "1:445624057016:web:6dda83b61a0b19ae3d884d"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export default firebase;