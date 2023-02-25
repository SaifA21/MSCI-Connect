import * as React from 'react';
import {TextField } from '@material-ui/core';


const Password = (props) => {

    return(
      <TextField 
        id="outlined-basic" 
        label="Password" 
        variant="filled" 
        type='password'
        error={props.error === '' ? false : true} 
        onChange={(event) => {props.handle(event.target.value)}} 
        style={{minWidth: 300}} 
        helperText = {props.error}
      />
    )
  
  }


  export default (Password)