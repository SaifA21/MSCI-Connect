import * as React from 'react';
import {Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
 
const  MessageItem = (props) => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            From: {props.author}
          </Typography>
          <Typography variant="h9" component="div">
            Topic: {props.topic}
          </Typography>
          <br></br>
          <Typography variant="body2">
            Content: {props.content}
            <br />
          </Typography>

        </CardContent>
        
      </Card>
    );
  }

  
  export default (MessageItem);