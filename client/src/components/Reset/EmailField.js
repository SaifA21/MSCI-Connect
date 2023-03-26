import * as React from 'react';
import {TextField } from '@material-ui/core';


const EmailField = (props) => {

    return(
        <TextField 
        id="outlined-basic" 
        label="Email" 
        variant="filled" 
        error={props.error === '' ? false : true} 
        onChange={(event) => {props.handle(event.target.value)}} 
        style={{minWidth: 300}} 
        helperText = {props.error}
      />
    )
  
  }
  
export default (EmailField)

