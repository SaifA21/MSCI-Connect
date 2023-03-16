import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';




const serverURL = ''


const Actions = (props) => {


const approveMessageAPI =  () => {
  callApproveMessageApi()
    .then(res => {
      var parsed = JSON.parse(res.express);
    })

} 

const callApproveMessageApi = async () => {

  const url = serverURL + "/api/approveMessage"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({chatID: props.chatID})

  });
  const body = await response.json();
  if (response.status != 200) throw Error(body.message);
  window.location.reload();
  return body;

}

const blockMessage =  () => {
  callBlockMessageAPI()
    .then(res => {
      var parsed = JSON.parse(res.express);
    })

} 

const callBlockMessageAPI = async () => {

  const url = serverURL + "/api/blockMessage"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    
    body: JSON.stringify({chatID: props.chatID})

  });
  const body = await response.json();
  if (response.status != 200) throw Error(body.message);
  window.location.reload();
  return body;

}
  

  return(
    
    <div>
        {props.reported == 1 && (
        <div>
          <Grid
        container spacing ={2}
        direction = "column"
        alignItems="center"
        justifyContent="center"
        >

        <IconButton aria-label="Approve" onClick={()=>approveMessageAPI()}>
            <CheckCircleIcon style={{ fontSize: 40 }}/>
          </IconButton>
    
          <IconButton aria-label="Deleted" onClick={()=>blockMessage()}>
            <BlockIcon style={{ fontSize: 40 }}/>
          </IconButton>
          </Grid>
     </div> 
     )}


      {props.reported == 3 && (
        <div>
          <Grid
          container spacing ={2}
          direction = "column"
          alignItems="center"
          justifyContent="center">

            <BlockIcon style={{ fontSize: 40 }}/>
            <p>Blocked</p>
            
          </Grid>
        </div> 
      )}


     
      
      </div>
  )
}


const  ChatItem = (props) => {

    const [reported, setReported] = React.useState(props.reported)
    const [review, setReview] = React.useState(reported)

    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          
          <Grid
            container spacing ={2}
            direction = "column" 
            alignItems="center"
            justifyContent="center"
            >

              <Grid
              container spacing ={2}
              direction = "row"
              alignItems="center"
              justifyContent="center"
              
              >


                < Grid item style={{minWidth: 1000}} >

                  <b><p>
                    {props.author}
                  </p></b>
                  <Typography variant="h9" component="div">
                    Topic: {props.topic}
                  </Typography>
                  <br></br>
                  <Typography variant="body2">
                    Content: {props.content}
                    <br />
                  </Typography>
                  
                </Grid>


                < Grid item>
                  <Actions chatID = {props.chatID} reported = {props.reported}></Actions>
                </Grid>

            </Grid>
          </Grid>

        </CardContent>
        
      </Card>
    );
  }

  
  export default (ChatItem);