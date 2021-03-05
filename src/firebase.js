const firebaseConfig = {
  apiKey: 'AIzaSyB9FstYd5L2kbOV05UXv97ATSHLWSW9msQ',
  authDomain: 'red-social-laboratoria-54e70.firebaseapp.com',
  projectId: 'red-social-laboratoria-54e70',
  storageBucket: 'gs://red-social-laboratoria-54e70.appspot.com',
  messagingSenderId: '908874787445',
  appId: '1:908874787445:web:b90c920cdc13bb0a2ba63c',
  measurementId: 'G-FRYXNB78K0',
};

// Inicializamos Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

