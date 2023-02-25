import React from 'react'
import { FormControlLabel, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {auth} from '../Firebase/firebase'
import Email from './EmailField';
import Password from './PasswordField';


const serverURL = '';
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3075";

export default function SignUp() {

  const {signIn} = useAuth() 

  const history = useHistory()

  const [name, setName] = React.useState('');
  const [nameError, setNameErorr] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const [checkBox, setCheckBox] = React.useState(false);
  const [checkBoxError, setCheckBoxError] = React.useState('');

  var newUser = ''

  const handleClick = (event) => {
    setCheckBox(event.target.checked);
  };


  const handleSubmit = async () =>{
    setNameErorr('')
    setEmailError('')
    setPasswordError('')
    setCheckBoxError('')
    
    
    if(name === ''){
      setNameErorr("Please enter your full name!")
    }

    if(!email.includes('@uwaterloo.ca')){
      setEmailError("Please enter a uwaterloo.ca email address")
    }

    if(password.length < 6){
      setPasswordError("Please enter a password with at least 6 characters")
    }

    if(checkBox === false){
      setCheckBoxError("Please accept the Terms & Condtions!")
    }




    if (checkBox === true && name !== '' &&  password.length>= 6 && email.includes("@uwaterloo.ca")){
      console.log('Signing Up User')
  
      try{


        await auth.createUserWithEmailAndPassword(email,password)
        await signIn(email,password)

        auth.onAuthStateChanged((user) => {
          if (user) {
            newUser = user.uid
            console.log(user.uid)
            // ...
          }
        });
  
       

        await signIn(email, password) 
        
        var user = {
          name: name,
          email: email,
          firebaseID: newUser
        }
        console.log ('user', user)

        addUser(user)
        

        history.push('/home')
      
      } catch{
        console.log("Failed to create an account")
      }
    
    }

  }

  const addUser = async (user) => {
    
    callApiAddUser(user)
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
      })
      
  
  } 
  
  const callApiAddUser = async (user) => {

    const url = serverURL + "/api/addUser"
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
  
    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.message);
    return body;
  
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
              <Name
                handle = {setName}
                error = {nameError}>
              </Name>
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
            <Terms></Terms>
            </Grid>

            <Grid item > 
              <FormControlLabel  control={<Checkbox onChange={handleClick} />} label = "I agree to the Terms & Condtions" />
            </Grid>

            
            <Grid item > 
              <Typography style={{color:"red"}} >{checkBoxError}</Typography>
            </Grid>

            <Grid item > 
            <Button variant='contained' onClick = {handleSubmit}>Sign Up</Button>
            </Grid>

            <Grid item > 
              <Typography> Alredy a user? <Link to = '/signin'>Sign In</Link></Typography>
            </Grid>


        </Grid>)
}

 export function Name (props) {
  return(
    <TextField 
      id="name" 
      label="Full Name" 
      variant="filled" 
      error={props.error === '' ? false : true} 
      onChange={(event) => {props.handle(event.target.value)}} 
      style={{minWidth: 300}} 
      helperText = {props.error}
    />
  )

}


const Terms = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div>
    <Button variant="text" onClick={handleClickOpen}>
      Terms & Condtions 
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Welcome to MSCI CONNECT!"}
      </DialogTitle>
      <DialogContent>
        
        <DialogContentText id="alert-dialog-description">
        <h2><strong>Terms and Conditions</strong></h2>
        <p>These terms and conditions outline the rules and regulations for the use of MSCI HEROS's Website, located at msci-connect.firebaseapp.com.</p>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use MSCI CONNECT if you do not agree to take all of the terms and conditions stated on this page.</p>
        <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
        <p>You will not use MSCI Connect in any way that violates the rules and guidelines set out by the University of Waterloo's Student Discipline and Academic Integrity policies including  <a href="https://uwaterloo.ca/secretariat/policies-procedures-guidelines/policy-71">Policy 71</a> </p>
        <h3><strong>Cookies</strong></h3>
        <p>We employ the use of cookies. By accessing MSCI CONNECT, you agree to the use of cookies in order to store your user authentication token in turn providing you with access to MSCI Connect. </p>
        
        </DialogContentText>

      </DialogContent>
    </Dialog>
  </div>
  )

}

