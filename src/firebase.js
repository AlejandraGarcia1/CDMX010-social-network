Your web app's Firebase configuration
For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyB9FstYd5L2kbOV05UXv97ATSHLWSW9msQ',
  authDomain: 'red-social-laboratoria-54e70.firebaseapp.com',
  projectId: 'red-social-laboratoria-54e70',
  storageBucket: 'gs://red-social-laboratoria-54e70.appspot.com',
  messagingSenderId: '908874787445',
  appId: '1:908874787445:web:b90c920cdc13bb0a2ba63c',
  measurementId: 'G-FRYXNB78K0',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
// *****DEFINIMOS UNA CONSTANTE, DONDE ESTAREMOS LLAMANDO EN CADA MOMENTO
// AL OBJETO "AUTH" AL UTILIZAR EL SERVICIO, PARA QUE EL EMAIL Y LA CONTRASEÑA
// SEA VALIDADA CON LA BASE DE DATOS*****
export const auth = firebase.auth();
// MODULO DE STORAGE DEL FIREBASE
export const storage = firebase.storage();
// MODULO PARA LOS POSTS
export const firestore = firebase.firestore();
