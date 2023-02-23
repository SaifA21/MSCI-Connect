import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'
import { useState } from 'react';
import { Typography } from '@material-ui/core';

const serverURL = ""; //enable for dev mode

export default function LookUp() {
  const{currentUser} = useAuth()

  const[emails,changeEmails]=useState([
    {
      "username":"Thev",
      "email":"t2nirmal@uwaterloo.ca"
    }
  ]);

  React.useEffect(() =>{
    loadEmails();
  },[])

  const loadEmails = () => {
    
    callApiLoadEmails()
    .then(res => {
        var parsed = JSON.parse(res.express);
        changeEmails(parsed)
      }
    ).then(console.log(emails))
  }

  const callApiLoadEmails = async (props) => {
    
    const url = serverURL + "/api/loadEmails";
    const response = await fetch(url, {method: "POST"});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  return (
    <div>
    {currentUser.uid!=null && (

    <div>
        <Navbar></Navbar>
        <h3>Student LookUp</h3>
        {emails.map((item)=>{
        return(
          <div>

            <br></br>
      
            
            <Typography>{item.username} : {item.email}</Typography>
            <br></br>
          </div>
        )
      })}
    </div>
    )}
    </div>
  )
}

