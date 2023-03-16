import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { clearConfigCache } from 'prettier';

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
      const{currentUser} = useAuth()
      const[admin, setAdmin]=useState([{admin:0}])

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

      React.useEffect(() =>{
        checkAdmin();
        console.log(admin)
      },[])

      

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
  
      console.log(admin);
  
      return (
        <div>
          {admin[0].admin === 0 ? <div> </div> : <IconButton onClick = {handleDelete}>
            <DeleteIcon style={{ fontSize: 40 }}/>
          </IconButton>}
        </div>
      )
    }



    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>

          <IconButton color = 'primary' aria-label="add" onClick={onclickUp}>
              <ThumbUpAltIcon style={{ fontSize: 20 }}/>
           </IconButton>

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
           <IconButton color = 'primary' aria-label="add" onClick={onclick}>


              <ThumbDownIcon style={{ fontSize: 20 }}/>
           </IconButton>
          <Button size="small">Learn More</Button>
          <DeleteUpdate />
        </CardActions>
      </Card>
    );
  }

  
  export default (UpdateItem);