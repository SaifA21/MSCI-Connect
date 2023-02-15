import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function SignOut() {

  const{currentUser, signOut} = useAuth()
  const history = useHistory()
  
 
  const handleSignout = async () => {

    try{
      console.log(currentUser.email)
      await signOut()
      console.log('out')
      history.push('/signin')
    }
    catch{}

  } 

  useEffect(() => {
    handleSignout();
  }, []);

  return (
   <div>Signing Out</div> 
  )
}
