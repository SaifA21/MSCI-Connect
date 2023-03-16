import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import ReportIcon from '@material-ui/icons/Report';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';

const serverURL = ''

const reportUser =  (userID, setReported, setReview) => {
    console.log(userID)
  callReportUserAPI(userID, setReported, setReview)
    .then(res => {
      var parsed = JSON.parse(res.express);
    })

} 

const callReportUserAPI = async (userID, setReported, setReview) => {
    console.log(userID)

  const url = serverURL + "/api/reportUser"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userID)

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

        <Grid
        container spacing ={2}
        direction = "column"
        alignItems="center"
        justifyContent="center"
        >

        <IconButton aria-label="report" onClick={() => reportUser({userID: props.userID}, props.setReported, props.setReview)}>
          <ReportIcon style={{ fontSize: 40 }}/>
          {console.log(props.userID)}
        </IconButton>
        
        </Grid>

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


const  LookupItem = (props) => {

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

             
                    {props.username} : {props.email}
                  
                  
                </Grid>

                < Grid item>
                  <Report userID = {props.userID} reported={reported} setReported = {setReported} review={review} setReview = {setReview}></Report>
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
          </Grid>

        </CardContent>
        
      </Card>
    );
  }

  
  export default (LookupItem);