import React from 'react'
import {TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import SubmitButton from './SubmitButton';
import EmailField from './EmailField';




export default function Reset() {

  const {resetPassword} = useAuth() 

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const [error, setError] = React.useState('');
  

  const handleSubmit = async () =>{

    setEmailError('')
    setError('')
   


    if (!email.includes('@uwaterloo.ca')){

        setEmailError("Enter valid @uwaterloo.ca email")
    }

    if (email.includes("@uwaterloo.ca")){
    
      try{

        await resetPassword(email)
        console.log("Sending email!")
        setError('Check your inbox for further instructions!')
      
      } catch{
        console.log("Failed to reset")
        setError('Account not found')
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
              <EmailField handle = {setEmail} error = {emailError}></EmailField>
            
            </Grid>


            <Grid item > 
              <Typography>{error}</Typography>
            </Grid>


            <Grid item > 
                <SubmitButton handleSubmit={handleSubmit}></SubmitButton>
            </Grid>

            <Grid item > 
              <Typography ><Link to = '/signin'>Proceed to Sign In</Link></Typography>
            </Grid>

            <Grid item > 
              <Typography ><Link to = '/signup'>Don't have an account?</Link></Typography>
            </Grid>



        </Grid>)
}

