import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDkRZPBBxzgoeA7WJIOO8wYtUTV6g5eSe0',
  authDomain: 'kristjan-firegram.firebaseapp.com',
  databaseURL: 'https://kristjan-firegram.firebaseio.com',
  projectId: 'kristjan-firegram',
  storageBucket: 'kristjan-firegram.appspot.com',
  messagingSenderId: '792814959189',
  appId: '1:792814959189:web:a77d2d295bb35ea47ef2dc'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initalize storage service
const projectStorage = firebase.storage();

// Initalize firestore service
const projectFirestore = firebase.firestore();

export { projectStorage, projectFirestore };
