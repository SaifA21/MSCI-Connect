import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'

export default function TC() {
  const{currentUser} = useAuth()
  return (
    <div>
    {currentUser.uid!=null && (

    <div>
        <Navbar></Navbar>
        <div>Terms and Conditions</div>
    </div>
    )}
    </div>
  )
}
