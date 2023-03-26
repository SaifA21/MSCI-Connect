import * as React from 'react';
import { Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow } from "@material-ui/core/";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';


const serverURL = '';

const Poll = (props) => {
  const onclick = () => {
    console.log('clicked')
  }
  const{currentUser} = useAuth()
  const[allowed,setAllowed]=useState(0)
  const[permitted,setPermitted]=useState({admin:0})
  const[admin, setAdmin]=useState([{admin:0}])

  React.useEffect(() =>{
    checkAdmin();
    console.log(admin)
  },[])

  React.useEffect(() =>{
    setPermitted(admin[0]);
  },[admin])
  
  React.useEffect(() =>{
    setAllowed(permitted.admin);
  },[permitted])

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

  const [vote, setVote] = React.useState('');

  const PinPoll = () => {
    console.log("pole id: " + props.pollID);
   

    const callApiPinPoll = async () => {

      const url = serverURL + "/api/pinPoll"

      const response = await fetch(url, {
        method: "POST",//DELETE/PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pollID: props.pollID })

      });
      const body = await response.json();
      if (response.status != 200) throw Error(body.update);
      return body;
    }

    const handlePin = (props) => {
      console.log('clicked')
      console.log(props.pollID)
      console.log(props.topic)
      callApiPinPoll(props.pollID)
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
    };

    return (
      <div>
        <Button onClick = {handlePin}>Pin Poll</Button>
      </div>
    );
  }


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Description: {props.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Topic: {props.topic}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Option 1: {props.option1}, with {props.votes1} votes so far
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Option 2: {props.option2}, with {props.votes2} votes so far
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Option 3: {props.option3}, with {props.votes3} votes so far
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Option 4: {props.option4}, with {props.votes4} votes so far
        </Typography>


      </CardContent>
      <CardActions>
        <FormControl>
          <Select

            onChange={(event) => {
              setVote(event.target.value)
              console.log(event.target.value)


            }}
            displayEmpty

            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Placeholder
            </MenuItem>
            <MenuItem value={1}>{props.option1}</MenuItem>
            <MenuItem value={2}>{props.option2}</MenuItem>
            <MenuItem value={3}>{props.option3}</MenuItem>
            <MenuItem value={4}>{props.option4}</MenuItem>

          </Select>
          <FormHelperText>Placeholder</FormHelperText>
        </FormControl>

        <ButtonSubmitVote pollID={props.pollID} vote={vote} />
        {allowed==1 &&
        <PinPoll></PinPoll>
        }
      </CardActions>
    </Card>
  );






}

const ButtonSubmitVote = (props) => {


  const addPollVote = () => {
    console.log(props.pollID)
    callAddPollVote(props)
      .then(res => {
        var parsed = JSON.parse(res.express);

      }
      ).then(console.log(props.vote))

  }

  const callAddPollVote = async (props) => {

    const url = serverURL + "/api/addPollVote";
    console.log(props.vote)
    const response = await fetch(url, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({ vote: props.vote, pollID: props.pollID })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }





  const handleSubmitVote = () => {
    addPollVote();
    console.log(props.vote);
    window.location.reload();

  };

  return (
    <div>

      <Button onClick={handleSubmitVote}>Submit</Button>
    </div>
  )
}



export default (Poll);

