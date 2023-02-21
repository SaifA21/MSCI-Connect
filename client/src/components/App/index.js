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



export default function App() {
  //const{currentUser} = useAuth()

  /*
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }
 
  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }
   */

    return (
      <Router> 
        <AuthProvider>

        <div>
        
          <PrivateRoute exact path="/" component={SignIn}/>
        </div>
        </AuthProvider>
      </Router>
    );
  
}