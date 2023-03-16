import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,Switch,
  Route,
  Link,
} from 'react-router-dom';
import history from '../Navigation/history';

import {Grid, AppBar, Box, 
  Toolbar, Button, Select, MenuItem,
   FormControl, InputLabel, TextField, 
   Radio, FormControlLabel, RadioGroup, 
   FormLabel, FormHelperText, helperText, 
   TableRow} from "@material-ui/core/";

import SignUp from '../SignUp';
import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import { AuthProvider } from '../../contexts/AuthContext';
import SignIn from '../SignIn';
import LookUp from '../LookUp';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import icon from './icon.png'


const serverURL =''
export default function Navbar() {
   
  const[allowed,setAllowed]=useState(0)
  const[admin, setAdmin]=useState([{admin:0}])
  const[permitted,setPermitted]=useState({admin:0})
  const{currentUser} = useAuth()


  const checkAdmin = () => {
      callApiCheckAdmin()
      .then(res => {
          var parsed = JSON.parse(res.express);
          console.log(parsed)
          setAdmin(parsed)
        }
      ).then(console.log(admin))
    }
    
    const callApiCheckAdmin = async (props) => {
      console.log('running')
      const url = serverURL + "/api/checkAdmin";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({firebaseID: currentUser.uid})
    
      });
      
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      
      return body;
    }



    React.useEffect(() =>{
      setPermitted(admin[0]);
    },[admin])

  React.useEffect(() =>{
      checkAdmin();
    },[])

    React.useEffect(() =>{
      setAllowed(permitted.admin);
    },[permitted])


    return (
      
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              { 5>3 && 
              (<Toolbar>
                <img alt="Icon"  aria-label="icon" src = {icon}/>
                <Button color="inherit" onClick={() => history.push('/home')}>News Home</Button>
                <Button color="inherit" onClick={() => history.push('/chat')}>Chat</Button>
                <Button color="inherit" onClick={() => history.push('/polls')}>Polls</Button>
                <Button color="inherit" onClick={() => history.push('/timeline')}>Timeline</Button>
                <Button color="inherit" onClick={() => history.push('/lookup')}>Student Lookup</Button>
                {allowed == 1 && (<Button color="inherit" onClick={() => history.push('/reported')}>Reported</Button>)}
                <Button color="inherit" onClick={() => history.push('/faq')}>FAQ</Button>
                <Button color="inherit" onClick={() => history.push('/tc')}>Terms and Conditions</Button>
                <Button color="inherit" onClick={() => history.push('/signout')}>Sign Out</Button>
              </Toolbar>)
              }
              
            </AppBar>
          </Box>
    );
  
}
