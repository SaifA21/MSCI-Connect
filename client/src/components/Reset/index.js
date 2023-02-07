import React from 'react'
import {TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';




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
              <Email
                handle = {setEmail}
                error = {emailError}>
              </Email>
            </Grid>


            <Grid item > 
              <Typography>{error}</Typography>
            </Grid>


            <Grid item > 
                <Button variant='contained' onClick = {handleSubmit}>Reset</Button>
            </Grid>

            <Grid item > 
              <Typography ><Link to = '/signin'>Proceed to Sign In</Link></Typography>
            </Grid>

            <Grid item > 
              <Typography ><Link to = '/signup'>Don't have an account?</Link></Typography>
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
