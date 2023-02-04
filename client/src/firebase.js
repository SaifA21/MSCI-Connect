import firebase from "firebase/app"
import "firebase/auth"


const app = firebase.initializeApp ({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_,
  projectId: REACT_APP_FIREBASE_PROJECT_ID ,
  storageBucket: REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
})

export const auth = app.auth()
export default app
