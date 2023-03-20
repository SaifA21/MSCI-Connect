import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'


export default function About() {
    
    const{currentUser} = useAuth()
    return (
      <div>
      {currentUser.uid!=null && (
  
      <div>
          <Navbar></Navbar>
          <h1>About Page</h1>
      </div>
      )}
      </div>
    )
  }