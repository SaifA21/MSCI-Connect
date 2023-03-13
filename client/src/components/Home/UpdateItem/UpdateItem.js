import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';

const  UpdateItem = (props) => {

    const onclick = () =>{
      console.log('clicked')
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
        <IconButton color = 'primary' aria-label="add" onClick={onclick}>
              <ThumbUpAltIcon style={{ fontSize: 20 }}/>
           </IconButton>
           <IconButton color = 'primary' aria-label="add" onClick={onclick}>
              <ThumbDownIcon style={{ fontSize: 20 }}/>
           </IconButton>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  
  export default (UpdateItem);