import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BlockIcon from '@material-ui/icons/Block';




const serverURL = ''



const reportMessageApi =  (chatID, setReported, setReview) => {
  callReportMessageApi(chatID, setReported, setReview)
    .then(res => {
      var parsed = JSON.parse(res.express);
    })

} 

const callReportMessageApi = async (chatID, setReported, setReview) => {

  const url = serverURL + "/api/reportMessage"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatID)

  });
  const body = await response.json();
  if (response.status != 200) throw Error(body.message);
  setReported(1)
  setReview(1)
  return body;

}



const Actions = (props) => {
  

  return(
      <div>
       <IconButton aria-label="Approve" onClick={()=>console.log('Approved')}>
          <CheckCircleIcon style={{ fontSize: 40 }}/>
        </IconButton>
   
        <IconButton aria-label="Deleted" onClick={()=>console.log('Blocked')}>
          <BlockIcon style={{ fontSize: 40 }}/>
        </IconButton>
      
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


                < Grid item style={{minWidth: 600}} >

                  <b><p>
                    {props.username}
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
                  <Actions></Actions>
                </Grid>

            </Grid>
          </Grid>

        </CardContent>
        
      </Card>
    );
  }

  
  export default (ChatItem);