import firebase from "firebase"
import 'firebase/auth';


const app = firebase.initializeApp ({
  apiKey: "AIzaSyDaQqz9n2dhB1CBK7Ta86b52qkpG-8KXjM",
  authDomain: "msci-connect.firebaseapp.com",
  databaseURL: "https://msci-connect-default-rtdb.firebaseio.com",
  projectId: "msci-connect",
  storageBucket: "msci-connect.appspot.com",
  messagingSenderId: "478995709192",
  appId: "1:478995709192:web:371f4562783d3b2b0ac0bd",
  measurementId: "G-4WSDN3L0LE"
})


export default app
export const auth = app.auth()