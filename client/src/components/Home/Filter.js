
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";

import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




const Filter = (props) => {
  

    return(
    <FormControl variant="filled" style={{minWidth: 300}}>
          <InputLabel id="sort">Filter by:</InputLabel>
          <Select
            labelId="sortBySelector"
            id="sortBySelector"
            //value={age}
            onChange={(event)=>{
                    
              props.mainPagefilter(event.target.value)
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

  export default (Filter)