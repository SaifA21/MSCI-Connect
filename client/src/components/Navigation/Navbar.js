import React, { Component } from 'react';
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



export default function Navbar() {


    return (
      
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              { 5>3 && 
              (<Toolbar>
                <Button color="inherit" onClick={() => history.push('/home')}>News Home</Button>
                <Button color="inherit" onClick={() => history.push('/chat')}>Chat</Button>
                <Button color="inherit" onClick={() => history.push('/polls')}>Polls</Button>
                <Button color="inherit" onClick={() => history.push('/timeline')}>Timeline</Button>
                <Button color="inherit" onClick={() => history.push('/lookup')}>Student Lookup</Button>
                {}
                <Button color="inherit" onClick={() => history.push('/faq')}>FAQ</Button>
                <Button color="inherit" onClick={() => history.push('/tc')}>Terms and Conditions</Button>
                <Button color="inherit" onClick={() => history.push('/signout')}>Sign Out</Button>
              </Toolbar>)
              }
              
            </AppBar>
          </Box>
    );
  
}
