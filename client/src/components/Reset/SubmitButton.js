import * as React from 'react';
import {Button } from '@material-ui/core';


const SubmitButton = (props) => {

    return(
        <Button variant='contained' onClick = {props.handleSubmit}>Reset</Button>
    )
  
  }


  export default (SubmitButton)

