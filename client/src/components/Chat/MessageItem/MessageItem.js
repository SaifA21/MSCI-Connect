import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import ReportIcon from '@material-ui/icons/Report';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';




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



const Report = (props) => {
  

  return(

    <div>

             
      
      {props.reported == 0 && (

        <IconButton aria-label="report" onClick={() => reportMessageApi({chatID: props.chatID}, props.setReported, props.setReview)}>
          <ReportIcon style={{ fontSize: 40 }}/>
        </IconButton>
    
    )}


      {props.review == 1 && (

        <div>
           <Grid
              container spacing ={2}
              direction = "column"
              alignItems="center"
              justifyContent="center"
              
              >
          <VisibilityIcon style={{ fontSize: 40 }}/>
          <Typography>Under Review</Typography></Grid>
        </div>
       
      
      )}

    </div>
    
  )
}


const  MessageItem = (props) => {

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
                  <Report chatID = {props.chatID} reported={reported} setReported = {setReported} review={review} setReview = {setReview}></Report>
                </Grid>

            </Grid>
          </Grid>

        </CardContent>
        
      </Card>
    );
  }

  
  export default (MessageItem);