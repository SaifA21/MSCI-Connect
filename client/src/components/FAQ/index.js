import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'

export default function FAQ() {
  const{currentUser} = useAuth()
  return (
    <div>
    {currentUser.uid!=null && (

    <div>
        <Navbar></Navbar>
        <div>FAQ</div>
    </div>
    )}
    </div>
  )
}
