import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom'
import Poll from './Poll/Poll.js'
import Navbar from '../Navigation/Navbar.js'
import { useState } from 'react';

const serverURL = '';

console.warn = () => {};

export default function Polls() {

  const{currentUser} = useAuth()

  const[allowed,setAllowed]=useState(0)
  const[permitted,setPermitted]=useState({admin:0})
  const[admin, setAdmin]=useState([{admin:0}])

  const [filter, setFilter] = React.useState('');
  const [polls, setPolls] = React.useState([]);
  const [vote, setVote] = React.useState('');
  const [topic, setSelection] = React.useState('');
  React.useEffect(()=>{
   
    console.log(vote)
  },[vote])

  const [description, setDescription] = React.useState('');

  const [option1, setOption1] = React.useState('');
  const [option2, setOption2] = React.useState('');
  const [option3, setOption3] = React.useState('');
  const [option4, setOption4] = React.useState('');


  var poll = {
    firebaseID: currentUser.uid,
    description: description,
    topic: topic,
    option1: option1,
    option2: option2,
    option3: option3,
    option4: option4,
  }


  React.useEffect(()=>{
    loadPolls()
    console.log(filter)
  },[filter])

  React.useEffect(()=>{
    loadPolls()
  },[])

  React.useEffect(() =>{
    console.log(polls)
  },[polls])

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

  const loadPolls = () => {
    
    callApiLoadPolls(filter)
    .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        setPolls(parsed);
        //console.log(updates);
        /*
        var mappedDict=new Object();
        parsed.map((item) => {
          mappedDict[item.id]=item.name
        })
        console.log(mappedDict);
        changeMovieDict(mappedDict);
        */
      
      }
    ).then(console.log(polls))
  }

  const callApiLoadPolls = async (props) => {
    
    const url = serverURL + "/api/loadPolls";
    const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({filter: filter})});
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

  return (
    <div>
      {currentUser.uid!=null && (

      <div>
      <Navbar></Navbar>
      {allowed==1 &&


      (<AddPollForm description = {setDescription} topic = {setSelection} option1 = {setOption1} option2 = {setOption2} option3 = {setOption3} option4 = {setOption4}  poll = {poll}>

      </AddPollForm>)
      }
      <Grid 
      container spacing ={1}
      direction = "column"
      alignItems = "center"
      justifyContent = "center"
      >
        <Grid item > 
          <div></div>
        </Grid> 

        <Grid 
            container spacing ={2}
            direction = "row"
            alignItems = "center"
            justifyContent = "center"
            >

                <Grid item >
                  <Filter filterSelection = {setFilter}></Filter> 
                </Grid>

            </Grid>

            
      </Grid>
      {polls.map((item)=>{
        return(
          <div>
            <br></br>
            <Poll pollID={item.pollID} topic = {item.class} description={item.description} option1={item.option1} option2={item.option2} option3={item.option3} option4={item.option4} votes1={item.votes1} votes2={item.votes2} votes3={item.votes3} votes4={item.votes4}></Poll>
            <br></br> 
          </div>
        )
      })}
      </div>
      )}
      </div>
  )
}



const AddPollForm = (props) => {

  const addPoll =  () => {
    callApiAddPoll()
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
  
  } 
  
  const callApiAddPoll = async () => {

    const url = serverURL + "/api/addPoll"
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.poll)
  
    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.poll);
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
    addPoll()
    setOpen(false);
  };


  return(
      <div>
        <IconButton color = 'primary' aria-label="add" onClick={handleClickOpen}>
          <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
        </IconButton>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Poll</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your poll details below
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.description(event.target.value)
                console.log(event.target.value)
    
              }}
            />
            <TextField
              
              margin="dense"
              label="Option 1"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.option1(event.target.value)
                console.log(event.target.value)
    
              }}
            />
            <TextField
              
              margin="dense"
              label="Option 2"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.option2(event.target.value)
                console.log(event.target.value)
    
              }}
            />
            <TextField
              
              margin="dense"
              label="Option 3"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.option3(event.target.value)
                console.log(event.target.value)
    
              }}
            />
            <TextField
              
              margin="dense"
              label="Option 4"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.option4(event.target.value)
                console.log(event.target.value)
    
              }}
            />

            <Selection topic={props.topic}></Selection>
          

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePost} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

}

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



const Filter = (props) => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
        <InputLabel id="sort">Filter by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          onChange={(event)=>{
                  
            props.filterSelection(event.target.value)
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




//<ButtonMailingList update ={update} />




