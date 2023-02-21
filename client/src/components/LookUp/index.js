import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'

export default function LookUp() {
  const{currentUser} = useAuth()
  return (
    <div>
    {currentUser.uid!=null && (

    <div>
        <Navbar></Navbar>
        <div>Student Lookup</div>
    </div>
    )}
    </div>
  )
}
