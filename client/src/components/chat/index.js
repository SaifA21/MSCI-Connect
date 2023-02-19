import React, {useState } from 'react'
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
import MessageItem from './MessageItem/MessageItem.js';

const serverURL = '';
//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3075";

console.warn = () => {};


export default function Chat() {
  
  const{currentUser} = useAuth()
  const history = useHistory()
  
  const [filter, setFilter] = React.useState('');
  const [sort, setSort] = React.useState('');
 
  const [body, setBody] = React.useState('');
  const [bodyError, setBodyError] = React.useState('');

  const [selection, setSelection] = React.useState('');
  const [selectionError, setSelectionError] = React.useState('');

  const[messages, setMessages]=useState([
    {
      "author":"thev",
      "content":"hello",
      "topic":"title22"
    },{
      "author":"thev2",
      "content":"hello322",
      "topic":"crazy news"
    }
  ])

  React.useEffect(()=>{
    loadMessages()
    console.log(filter)
  },[filter,sort])

  React.useEffect(()=>{
    loadMessages()
  },[])

  var message = {
      firebaseID: currentUser.uid,
      messagebody: body,
      filter: selection
    }

  var loadProperties={
      filter: filter,
      sort: sort
    }
    
  const loadMessages = () => {
    console.log('three', filter, sort)
    callApiLoadMessages(filter, sort)
    .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        setMessages(parsed);
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
    ).then(console.log(messages))
  }

  const callApiLoadMessages = async (props) => {
    
    const url = serverURL + "/api/loadMessages";
    console.log(loadProperties)
    const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({filter: filter, sort: sort})});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }
  
    return (
      <div>
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
                  <Sort sortSelection = {setSort}></Sort>
                </Grid>

                <Grid item >
                  <Filter filterSelection = {setFilter}></Filter> 
                </Grid>

                <Grid item >
                  <AddMessageForm topic = {setSelection} body = {setBody} message = {message}>
                  </AddMessageForm> 
                </Grid>

                <Grid item >
                  <div>wewe</div>
                </Grid>

            </Grid>
            <div>we</div>
            <div>we23</div>
            
          </Grid>
          {messages.map((item)=>{
            return(
              <div>
                <br></br>
                <MessageItem author={item.author} title={item.title} content={item.content}></MessageItem>
                <br></br>
              </div>
            )
          })}
          </div>
      )




////////////////////////////////////////////////////////////////////////


 }
  


const Sort = (props) => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
        <InputLabel id="sort">Sort by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          onChange={(event)=>{
            props.sortSelection(event.target.value)
            console.log(event.target.value)
          }}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={10}>Newest to Oldest</MenuItem>
          <MenuItem value={20}>Oldest to Newest</MenuItem>
          <MenuItem value={30}>Most Upvoted</MenuItem>
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

const AddMessageForm = (props) => {

  const addChat =  () => {
    callApiAddChat()
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
  
  } 
  
  const callApiAddChat = async () => {

    const url = serverURL + "/api/addChat"
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props.message)
  
    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.message);
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
    addChat()
    setOpen(false);
  };


  return(
      <div>
        <IconButton color = 'primary' aria-label="add" onClick={handleClickOpen}>
          <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
        </IconButton>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your message below and select the subject it is closest related to.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Message"
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





