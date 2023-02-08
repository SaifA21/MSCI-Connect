import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';




export default function Chat() {
  
  const{currentUser} = useAuth()


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
                <AddMessageForm></AddMessageForm> 
              </Grid>

              <Grid item >
                <div>Posting As: {currentUser.email}</div>
              </Grid>

          </Grid>
        </Grid>
        )}


const Sort = () => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
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
  <FormControl variant="filled" style={{minWidth: 300}}>
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
          <MenuItem value={40}>MSCI 334</MenuItem>
          <MenuItem value={50}>MSCI 311</MenuItem>
          <MenuItem value={60}>Co-op</MenuItem>
          <MenuItem value={70}>General</MenuItem>
        </Select>
      </FormControl>
  )
}

const AddMessageForm = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return(
      <div>
        <IconButton color = 'primary' aria-label="add" onClick={handleClickOpen}>
          <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
        </IconButton>
        
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Message</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your message below and select the subject it is closest related to.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Message"
              type="text"
              fullWidth
            />
            <Filter></Filter>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );

}
