import '../css/reset.css';
import '../css/styles.css';
import '../css/home.css';
import firebase from 'firebase/app';

// Add the Firebase services that you want to use

import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAi94ylwICBpKvyF1yCpIoLxDEsr6e5umY',
  authDomain: 'durf2030-e7f54.firebaseapp.com',
  projectId: 'durf2030-e7f54',
  storageBucket: 'durf2030-e7f54.appspot.com',
  messagingSenderId: '904823783192',
  appId: '1:904823783192:web:3928c52077d8e14dd3a86d',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
