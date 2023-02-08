import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link } from 'react-router-dom';

export default function Chat() {
  return (
    <Grid 
    container spacing ={2}
    direction = "column"
    alignItems = "center"
    justifyContent = "center"
    >
      <Grid item>
        <div></div>
        <div></div>


      </Grid>
      <Grid 
          container spacing ={2}
          direction = "row"
          alignItems = "center"
          justifyContent = "center"
          >
          
              <Grid item > 
                <Sort></Sort>
              </Grid>

              <Grid item >
                <Filter></Filter> 
              </Grid>

              <Grid item >
                <Add></Add> 
              </Grid>

          </Grid>
        </Grid>
        )}


const Sort = () => {

  return(
  <FormControl variant="filled" style={{minWidth: 120}}>
        <InputLabel id="sort">Sort by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          //onChange={handleChange}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={10}>Newest to Oldest</MenuItem>
          <MenuItem value={20}>Oldest to Newest</MenuItem>
          <MenuItem value={30}>Most Upvoted</MenuItem>
        </Select>
      </FormControl>
  )
}

const Filter = () => {

  return(
  <FormControl variant="filled" style={{minWidth: 120}}>
        <InputLabel id="sort">Filter by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          //onChange={handleChange}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={10}>MSCI 446</MenuItem>
          <MenuItem value={20}>MSCI 431</MenuItem>
          <MenuItem value={30}>MSCI 342</MenuItem>
          <MenuItem value={30}>MSCI 334</MenuItem>
          <MenuItem value={30}>MSCI 311</MenuItem>
        </Select>
      </FormControl>
  )
}

const Add = () => {

  return(
  <IconButton color = 'primary' aria-label="add">
    <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
  </IconButton>

)}
