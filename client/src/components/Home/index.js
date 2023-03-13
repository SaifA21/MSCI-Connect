import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import UpdateItem from './UpdateItem/UpdateItem';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Navbar from '../Navigation/Navbar.js'
import Filter from './Filter.js'

//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;
var mailList = ''


function composeMailList(props) {
  mailList = 'mailto:'
  for (let x in props){
    mailList = mailList+props[x].email+';'
  }
  console.log(mailList)
  
}

const Sort = () => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
        <InputLabel id="sort">Sort by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          //onChange={handleChange}
        >
          <MenuItem value={10}>Newest to Oldest</MenuItem>
          <MenuItem value={20}>Oldest to Newest</MenuItem>
        </Select>
      </FormControl>
  )
}

const TagFilter = (props) => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
        <InputLabel id="sort">Special Tags:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          onChange={(event)=>{
            props.tagSelection(event.target.value)
            console.log(event.target.value)
          }}
        >
          <MenuItem value={0}><em>None</em></MenuItem>
          <MenuItem value={10}>Pinned</MenuItem>
         
        </Select>
      </FormControl>
  )
}





//////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////

const NewsUpdates = (props) => {
  const{currentUser} = useAuth()

  const[allowed,setAllowed]=useState(0)
  const[permitted,setPermitted]=useState({admin:0})
  const[admin, setAdmin]=useState([{admin:0}])

  const [filter, setFilter] = React.useState('');


  const [title, setTitle] = React.useState('');
  const [titleError, setTitleError] = React.useState('');

  const [body, setBody] = React.useState('');
  const [bodyError, setBodyError] = React.useState('');

  const [selection, setSelection] = React.useState('');
  const [selectionError, setSelectionError] = React.useState('');
  
   const [mainPagefilter, setmainPageFilter] = React.useState('');
   const [tag, setTag] = React.useState('');
  
  React.useEffect(()=>{
    loadUpdates()
    console.log(mainPagefilter)
  },[mainPagefilter, tag])


    const[updates,changeUpdates]=useState([
    {
      "author":"",
      "content":"",
      "title":""
    }
  ]);

  var firebaseID = {
    firebaseID: currentUser.uid
  }

  var update = {
    firebaseID: currentUser.uid,
    updatebody: body,
    filter: selection,
    updatetitle: title
  }

  React.useEffect(() =>{
    loadUpdates();
  },[])

  React.useEffect(() =>{
    console.log(currentUser)
    checkAdmin();
    console.log(admin)
  },[])

  
  React.useEffect(() =>{
    setPermitted(admin[0]);
  },[admin])
  
  React.useEffect(() =>{
    setAllowed(permitted.admin);
  },[permitted])

  React.useEffect(() =>{
    console.log(updates)
  },[updates])


  const loadUpdates = () => {
    
    callApiLoadUpdates(mainPagefilter)
    .then(res => {
        var parsed = JSON.parse(res.express);
        changeUpdates(parsed)
      }
    ).then(console.log(mainPagefilter))
  }

  const callApiLoadUpdates = async (props) => {
    
    const url = serverURL + "/api/loadUpdates";
    const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({mainPagefilter: mainPagefilter, tag: tag})});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

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

  return(

    <Grid
    container spacing ={1}
    direction = "column"
    >
    
    <Grid item>
    <div>

    

    {currentUser.uid!=null && (

    

    <div>
      <Navbar></Navbar>
      
      <Grid
        container spacing ={1}
        direction = "row"
        alignItems = "center"
        justifyContent = "center"
      >
       <Filter  mainPagefilter = {setmainPageFilter}></Filter> 
       
       <TagFilter tagSelection = {setTag}></TagFilter>
      {allowed==1 &&


        (<AddUpdateForm 
          subject = {title} description = {body}
          topic = {setSelection} title = {setTitle} 
          body = {setBody} update = {update}>

        </AddUpdateForm>)
      }


       <ButtonMailingList update ={update} />
       {allowed==1 &&
        (<GetMailingList></GetMailingList>)
      } 
      
       
      </Grid>
      {updates.map((item)=>{
        console.log(item)
        return(
          <div>

            <br></br>
            

            <UpdateItem updateID={item.updateID} author={item.username} title={item.title} content={item.content} class={item.class}></UpdateItem>

            <br></br>
          </div>
        )
      })}
      
    </div>
    )}
   
    </div>
    </Grid>
    </Grid>
  )

}




///////////////////////////////////////////////////////////////////////
const ButtonMailingList= (props) => {

  const addMailingList =  () => {
    callApiAddMailingList()
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
  
  } 
  
  const callApiAddMailingList = async () => {

    const url = serverURL + "/api/addMailingList"
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.update)
  
    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.update);
    return body;
  }

  const handleMailingList = () => {
    addMailingList();
  };

  return(
    <div> 
      <Button onClick={handleMailingList}>Subscribe to Mailing List</Button>
    </div>
  )
}



/////////////////////////////////////////////////////////

const AddUpdateForm = (props) => {

  const addUpdate =  () => {
    callApiAddUpdate()
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
  
  } 
  
  const callApiAddUpdate = async () => {

    const url = serverURL + "/api/addUpdate"
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.update)
  
    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.update);
    return body;
  
  }
  
  

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };

  const handlePost = () => {
    addUpdate()
    setOpen(false);
  };

  const sendEmail = ()=>{
    console.log('hi')
    var email = mailList + '?subject='+props.subject+'&body='+props.description
    console.log(email)
    window.location.href = email;

   



  }


  return(
      <div>
        <IconButton color = 'primary' aria-label="add" onClick={handleClickOpen}>
          <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
        </IconButton>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your update below and select the subject it is closest related to.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.title(event.target.value)
                console.log(event.target.value)
    
              }}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.body(event.target.value)
                console.log(event.target.value)
    
              }}
            />
            
            
          <Selection topic={props.topic}>
          </Selection>

          </DialogContent>
          <DialogActions>
          <Button onClick={()=>sendEmail()} color="primary">
              Email Mailing List
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" onClick={handlePost} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

}

////////////////////////////////////////////////////////////
const Selection = (props) => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
        <InputLabel id="sort">Filter by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          onChange={(event)=>{        
            props.topic(event.target.value)
            console.log(event.target.value)

          }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={'MSCI 446'}>MSCI 446</MenuItem>
          <MenuItem value={'MSCI 431'}>MSCI 431</MenuItem>
          <MenuItem value={'MSCI 342'}>MSCI 342</MenuItem>
          <MenuItem value={'MSCI 334'}>MSCI 334</MenuItem>
          <MenuItem value={'MSCI 311'}>MSCI 311</MenuItem>
          <MenuItem value={'Co-op'}>Co-op</MenuItem>
          <MenuItem value={'General'}>General</MenuItem>
        </Select>
      </FormControl>
  )
}



/////////////////////////////////////////////////////////////

const GetMailingList = (props) => {
  const[MLemails,changeMLEmails]=useState([
    {
      "username":"Sajeen",
      "email":"sselvaka@uwaterloo.ca"
    }
  ]);
  
  React.useEffect(() =>{
    loadMLEmails();
  },[])
  
  const loadMLEmails = () => {    
    callApiLoadMLEmails()
    .then(res => {
        var parsed = JSON.parse(res.express);
        changeMLEmails(parsed)
        composeMailList(parsed)
      }
    ).then(console.log(MLemails))
  }
  
  const callApiLoadMLEmails = async (props) => {
      
    const url = serverURL + "/api/getMailingList";
    const response = await fetch(url, {method: "POST"});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  const handleGetMailingList = () => {
    loadMLEmails();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>View Mailing List</Button>

      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Mailing List</DialogTitle>
          <DialogContent>
          {MLemails.map((item)=>{ 
           return(
            <DialogContentText >
            {item.username} : {item.email}
          </DialogContentText>) 
         })}

           

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}


/////////////////////////////////////////////////////////////

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  

  render() {
    const { classes } = this.props;

    

    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Latest News..
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

          


        </Grid>
      </Grid>
    )


    return (
      <MuiThemeProvider>
        <div className={classes.root}>
          <CssBaseline />
          <NewsUpdates/>

        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles()(Home);
