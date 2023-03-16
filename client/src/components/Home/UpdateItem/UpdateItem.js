import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';

const serverURL = ""; //enable for dev mode

const  UpdateItem = (props) => {

    const onclickUp = () =>{
      console.log('clicked')
      callApiUpvoteUpdate()
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
  
    }

    const callApiUpvoteUpdate = async () => {

      const url = serverURL + "/api/upvoteUpdate"
    
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({updateID: props.updateID})
    
      });
      const body = await response.json();
      if (response.status != 200) throw Error(body.update);
      return body;
    }

    const onclickDown = () =>{
      console.log('clicked')
      callApiDownvoteUpdate()
      .then(res => {
        var parsed = JSON.parse(res.express);
      })
  
    }

    const callApiDownvoteUpdate = async () => {

      const url = serverURL + "/api/downvoteUpdate"
    
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({updateID: props.updateID})
    
      });
      const body = await response.json();
      if (response.status != 200) throw Error(body.update);
      return body;
    }

    /////////////////////////////////////////////////////
    const DeleteUpdate = () => {

      console.log (props.updateID);
      const callApiDeleteNewsUpdate = async () => {
  
        const url = serverURL + "/api/deleteNewsUpdate"
      
        const response = await fetch(url, {
          method: "POST",//DELETE/PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({updateID: props.updateID})
      
        });
        const body = await response.json();
        if (response.status != 200) throw Error(body.update);
        return body;
      }
  
  
      const handleDelete = (props) => {
        console.log('clicked')
        callApiDeleteNewsUpdate(props.updateID)
        .then(res => {
          var parsed = JSON.parse(res.express);
        })
        window.location.reload();
      };
  
  
  
      return (
        <div>
          
          <Button size = "small" onClick = {handleDelete}>Delete</Button>
        </div>
      )
    }



    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            From: {props.author}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Topic: {props.class}
          </Typography>
          <Typography variant="h6" component="div">
            Title: {props.title}
          </Typography>
          <Typography variant="body2">
            Content: {props.content}
            <br />
          </Typography>
          

        </CardContent>
        <CardActions>

            

           <IconButton color = 'primary' aria-label="add" onClick={onclickDown}>

              <ThumbUpAltIcon style={{ fontSize: 20 }}/>
           </IconButton>
           <IconButton color = 'primary' aria-label="add" onClick={onclickUp}>


              <ThumbDownIcon style={{ fontSize: 20 }}/>
           </IconButton>
          <Button size="small">Learn More</Button>
          <DeleteUpdate />
        </CardActions>
      </Card>
    );
  }

  
  export default (UpdateItem);