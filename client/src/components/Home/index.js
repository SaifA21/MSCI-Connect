import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow} from "@material-ui/core/";
import UpdateItem from './UpdateItem/UpdateItem';
import { useState } from 'react';


//Dev mode
const serverURL = ""; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },

});

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
          <MenuItem value={10}>Newest to Oldest</MenuItem>
          <MenuItem value={20}>Oldest to Newest</MenuItem>
        </Select>
      </FormControl>
  )
}

const Filter = (props) => {

  return(
  <FormControl variant="filled" style={{minWidth: 300}}>
        <InputLabel id="sort">Filter by:</InputLabel>
        <Select
          labelId="sortBySelector"
          id="sortBySelector"
          //value={age}
          onChange={(event)=>{
                  
            props.filterSelection(event.target.value)
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

const NewsUpdates = (props) => {

  const[updates,changeUpdates]=useState([
    {
      "author":"thev",
      "content":"hello",
      "title":"title22"
    },{
      "author":"thev2",
      "content":"hello322",
      "title":"crazy news"
    }
  ]);

  React.useEffect(() =>{
    loadUpdates();
  },[])

  React.useEffect(() =>{
    console.log(updates)
  },[updates])


  const loadUpdates = () => {
    callApiLoadUpdates()
    .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(parsed)
        changeUpdates(parsed);
        //console.log(updates);
        /*
        var mappedDict=new Object();
        parsed.map((item) => {
          mappedDict[item.id]=item.name
        })
        console.log(mappedDict);
        changeMovieDict(mappedDict);
        */
      }
    ).then(console.log(updates))
  }
  
  const callApiLoadUpdates = async () => {
    const url = serverURL + "/api/loadUpdates";
    const response = await fetch(url, {method: "POST"});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }


  return(
    <div>

      {updates.map((item)=>{
        return(
          <div>

            <br></br>
            
            <UpdateItem author={item.username} title={item.title} content={item.content} class={item.class}></UpdateItem>
            <br></br>
          </div>
        )
      })}

    </div>

  )

}



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
        this.setState({ mode: parsed[0].mode });
      });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  

  render() {
    const { classes } = this.props;

    

    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: '100vh' }}
        className={classes.mainMessageContainer}
      >
        <Grid item>

          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>
                Latest News..
              </React.Fragment>
            ) : (
              <React.Fragment>
                Welcome back!
              </React.Fragment>
            )}
          </Typography>

          


        </Grid>
      </Grid>
    )


    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <NewsUpdates/>

        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
