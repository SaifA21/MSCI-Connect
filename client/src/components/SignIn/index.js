import React from 'react'
import {TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp';



export default function SignIn() {

  const {signIn} = useAuth() 

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');


  

  const handleSubmit = () =>{
   


    if (password.length>= 6 && email.includes("@uwaterloo.ca")){
    
      try{

        signIn(email,password)
        console.log("Signing In!")
      
      } catch{
        console.log("Failed to sign in")
      }
    
    }

  }


  return (
    <Grid 
        container spacing ={2}
        direction = "column"
        alignItems = "center"
        justifyContent = "center"
        >
        
            <Grid item > 
            <Typography 
                variant="h3" 
                gutterBottom>
                Welcome to MSCI Connect!
            </Typography> 
            </Grid>

            <Grid item > 
              <Email
                handle = {setEmail}
                error = {emailError}>
              </Email>
            </Grid>

            <Grid item > 
              <Password
                handle = {setPassword}
                error = {passwordError}>
              </Password>
            </Grid>


            <Grid item > 
                <Button variant='contained' onClick = {handleSubmit}>Sign In</Button>
            </Grid>

            <Grid item > 
              <Typography > Not a user? <Link to = '/signup'>Sign Up</Link></Typography>
            </Grid>



        </Grid>)
}

const Email = (props) => {

  return(
    <TextField 
      id="outlined-basic" 
      label="Email" 
      variant="filled" 
      error={props.error === '' ? false : true} 
      onChange={(event) => {props.handle(event.target.value)}} 
      style={{minWidth: 300}} 
      helperText = {props.error}
    />
  )

}


const Password = (props) => {

  return(
    <TextField 
      id="outlined-basic" 
      label="Password" 
      variant="filled" 
      type='password'
      error={props.error === '' ? false : true} 
      onChange={(event) => {props.handle(event.target.value)}} 
      style={{minWidth: 300}} 
      helperText = {props.error}
    />
  )

}
