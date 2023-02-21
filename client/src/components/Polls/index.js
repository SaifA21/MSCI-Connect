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

const serverURL = '';

console.warn = () => {};

export default function Polls() {

  const{currentUser} = useAuth()

  const [filter, setFilter] = React.useState('');
  const [polls, setPolls] = React.useState([]);

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

  const loadPolls = () => {
    
    callApiLoadPolls(filter)
    .then(res => {
        var parsed = JSON.parse(res.express);
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

  return (
    <div>
      {currentUser.uid!=null && (

      <div>
      <Navbar></Navbar>
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
            <Poll description={item.description} option1={item.option1} option2={item.option2} option3={item.option3} option4={item.option4} votes1={item.votes1} votes2={item.votes2} votes3={item.votes3} votes4={item.votes4}></Poll>
            <br></br>
          </div>
        )
      })}
      </div>
      )}
      </div>
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
