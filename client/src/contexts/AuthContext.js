import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../components/Firebase/firebase'

const AuthContext = React.createContext()


export function useAuth() {
  return (useContext(AuthContext))
}

export function AuthProvider ({children}){


    const [currentUser, setCurrentUser] = useState()
    
    
    function signUp(email,password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }

    function signIn(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }


    function signOut() {
        return auth.signOut()
    }

   

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {

        setCurrentUser(user)
    
        })

        return unsubscribe

    }, [])
    

    
    
    
    const value = {currentUser, signUp, signIn, resetPassword, signOut}

    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    ) 

}
