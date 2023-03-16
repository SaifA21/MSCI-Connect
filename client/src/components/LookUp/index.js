import React from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'
import { useState } from 'react';
import { Typography } from '@material-ui/core';
import LookupItem from './LookupItem';

const serverURL = ""; //enable for dev mode

export default function LookUp() {
  const{currentUser} = useAuth()

  const[emails,changeEmails]=useState([
    {
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
        <h3>Student Lookup</h3>
        {emails.map((item)=>{
        return(
          <div>
            <LookupItem userID = {item.userID} username = {item.username} email= {item.email} reported={item.reported}></LookupItem>
            <br></br>
          </div>
        )
      })}
    </div>
    )}
    </div>
  )
}

