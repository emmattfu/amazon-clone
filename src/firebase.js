import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCVaFYZcpCBAODgSPU_OkjGb3I7LoheHOY",
    authDomain: "clone-996ac.firebaseapp.com",
    databaseURL: "https://clone-996ac.firebaseio.com",
    projectId: "clone-996ac",
    storageBucket: "clone-996ac.appspot.com",
    messagingSenderId: "712569644093",
    appId: "1:712569644093:web:dcf5788f057eba14e23654",
    measurementId: "G-JNW114G3DK"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};