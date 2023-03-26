import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'
import Text from './Text.js'

export default function About() {
    
    const{currentUser} = useAuth()
    return (
      <div>
      {currentUser.uid!=null && (
  
      <div>
          <Navbar></Navbar>
          <Text></Text>
      </div>
      )}
      </div>
    )
  }