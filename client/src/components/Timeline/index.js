import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'
import Happy from '@material-ui/icons/InsertEmoticon';
import Ok from '@material-ui/icons/SentimentSatisfied';
import Sad from '@material-ui/icons/SentimentVeryDissatisfied';
import NotAttend from '@material-ui/icons/Home';
import Attend from '@material-ui/icons/School';
import DateCountdown from 'react-date-countdown-timer';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {Grid, AppBar, Box, Button, Select, MenuItem, FormControl, InputLabel, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText} from "@material-ui/core/";

const serverURL = '';
var rowsPerPage = 5;

console.warn = () => {};

const HappyButton = (props) => {
  const{currentUser} = useAuth()



  const addTimeLineVote = async(props) => {
    console.log(props.mood) 
    callAddTimeLineVote(props)
    .then(res => {
        var parsed = JSON.parse(res.express);
       
      }
    ).then(console.log(props.mood))
  }

  const callAddTimeLineVote = async (props) => {
    
    const url = serverURL + "/api/addTimeLineVote";
    console.log(props.mood)
    const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({voteTimeline: props.mood, itemID: props.itemID, firebaseID: currentUser.uid})});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  
  const handleTimelineVote = () => {
    addTimeLineVote(props);
    console.log(props.itemID);
  };
   

  
  return(
    <div> 
      
      <IconButton  onClick={handleTimelineVote} color = 'primary' aria-label="add" >
        <Happy></Happy>
        </IconButton>
    </div>
  )
  }


  const OKButton = (props) => {
    const{currentUser} = useAuth()




    const addTimeLineVote = async(props) => {
      console.log(props.mood) 
      callAddTimeLineVote(props)
      .then(res => {
          var parsed = JSON.parse(res.express);
         
        }
      ).then(console.log(props.mood))
    }
  
    const callAddTimeLineVote = async (props) => {
      
      const url = serverURL + "/api/addTimeLineVote";
      console.log(props.mood)
      const response = await fetch(url, {method: "POST", headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({voteTimeline: props.mood, itemID: props.itemID, firebaseID: currentUser.uid})});
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }
  
    
    const handleTimelineVote = () => {
      addTimeLineVote(props);
      console.log(props.itemID);
    };
     
  
    
    return(
      <div> 
        
        <IconButton  onClick={handleTimelineVote} color = 'primary' aria-label="add" >
          <Ok></Ok>
          </IconButton>
      </div>
    )
    }


    const SadButton = (props) => {
      const{currentUser} = useAuth()




      const addTimeLineVote = async(props) => {
        console.log(props.mood) 
        callAddTimeLineVote(props)
        .then(res => {
            var parsed = JSON.parse(res.express);
           
          }
        ).then(console.log(props.mood))
      }
    
      const callAddTimeLineVote = async (props) => {
        
        const url = serverURL + "/api/addTimeLineVote";
        console.log(props.mood)
        const response = await fetch(url, {method: "POST", headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({voteTimeline: props.mood, itemID: props.itemID, firebaseID: currentUser.uid})});
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      }
    
      
      const handleTimelineVote = () => {
        addTimeLineVote(props);
        console.log(props.itemID);
      };
       
    
      
      return(
        <div> 
          
          <IconButton  onClick={handleTimelineVote} color = 'primary' aria-label="add" >
            <Sad></Sad>
            </IconButton>
        </div>
      )
      }


      const AttendButton = (props) => {
        const{currentUser} = useAuth()
  
  
  
  
        const addTimeLineVote = async(props) => {
          console.log(props.mood) 
          callAddTimeLineVote(props)
          .then(res => {
              var parsed = JSON.parse(res.express);
             
            }
          ).then(console.log(props.mood))
        }
      
        const callAddTimeLineVote = async (props) => {
          
          const url = serverURL + "/api/addTimeLineVote";
          console.log(props.mood)
          const response = await fetch(url, {method: "POST", headers: {
            "Content-Type": "application/json",
          },body: JSON.stringify({voteTimeline: props.mood, itemID: props.itemID, firebaseID: currentUser.uid})});
          const body = await response.json();
          if (response.status !== 200) throw Error(body.message);
          return body;
        }
      
        
        const handleTimelineVote = () => {
          addTimeLineVote(props);
          console.log(props.itemID);
        };
         
      
        
        return(
          <div> 
            
            <IconButton  onClick={handleTimelineVote} color = 'primary' aria-label="add" >
              <Attend></Attend>
              </IconButton>
          </div>
        )
        }


        const NotAttendButton = (props) => {
          const{currentUser} = useAuth()
    
    
    
    
          const addTimeLineVote = async(props) => {
            console.log(props.mood) 
            callAddTimeLineVote(props)
            .then(res => {
                var parsed = JSON.parse(res.express);
               
              }
            ).then(console.log(props.mood))
          }
        
          const callAddTimeLineVote = async (props) => {
            
            const url = serverURL + "/api/addTimeLineVote";
            console.log(props.mood)
            const response = await fetch(url, {method: "POST", headers: {
              "Content-Type": "application/json",
            },body: JSON.stringify({voteTimeline: props.mood, itemID: props.itemID, firebaseID: currentUser.uid})});
            const body = await response.json();
            if (response.status !== 200) throw Error(body.message);
            return body;
          }
        
          
          const handleTimelineVote = () => {
            addTimeLineVote(props);
            console.log(props.itemID);
          };
           
        
          
          return(
            <div> 
              
              <IconButton  onClick={handleTimelineVote} color = 'primary' aria-label="add" >
                <NotAttend></NotAttend>
                </IconButton>
            </div>
          )
          }


export default function Timeline() {
  
  const{currentUser} = useAuth()
  const[allowed,setAllowed]=useState(0)
  const[permitted,setPermitted]=useState({admin:0})
  const[admin, setAdmin]=useState([{admin:0}])
  const [itemName, setItemName] = React.useState('');
  const [type, setType] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [date, setDate] = React.useState('');

  var item = {
    firebaseID: currentUser.uid,
    itemName: itemName,
    type: type,
    topic: topic,
    date: date
  }

  React.useEffect(() =>{
    console.log(currentUser)
    checkAdmin();
    console.log(admin)
  },[])

  
  React.useEffect(() =>{
    setPermitted(admin[0]);
  },[admin])
  
  React.useEffect(() =>{
    setAllowed(permitted.admin);
    console.log(permitted)
  },[permitted])

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

  return (
    <div>
    {currentUser.uid!=null && (

    <div>
    <Navbar></Navbar>
    {allowed==1 &&
      (<AddTimelineItem item={item} topic = {setTopic} name = {setItemName} type = {setType} date = {setDate}>
      </AddTimelineItem>)
    }
    <TimelineTable></TimelineTable>
    </div>)}
    </div>
  )
}
 

    
const TimelineTable = () => {

 

  const{currentUser} = useAuth()
  
  const [rows, setRows] = React.useState([]);
  
  React.useEffect(() =>{
      getTimeline();
    },[])

    const getTimeline =  () => {
      callApiGetTimeline()
        .then(res => {
          var parsed = JSON.parse(res.express);
          setRows(parsed)
          rowsPerPage = parsed.length
          
        })
    
    } 
    
    const callApiGetTimeline = async () => {
      const url = serverURL + "/api/getTimeline"
      const response = await fetch(url, { method: "POST"});
      const body = await response.json();

      if (response.status != 200) throw Error(body.message);
      
      return body;
    
    }

  
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    { id: 'vote', numeric: false, disablePadding: false, label: 'Vote'},
    { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
    { id: 'subject', numeric: true, disablePadding: false, label: 'Subject' },
    { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
    { id: 'duedate', numeric: true, disablePadding: false, label: 'Due Date' },
    { id: 'countdown', numeric: true, disablePadding: false, label: 'Countdown' }
  ];
  
  function EnhancedTableHead(props) {
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell >
              <div></div>           
          </TableCell>

          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              
            >
              
              
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'Dark'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.dark, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.light,
          },
    title: {
      flex: '1 1 100%',
    },
  }));
  
  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Timeline
        </Typography>
      

      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));
  
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('duedate');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    
    const [VoteType, setVoteType] = React.useState('');
    const [itemID, setItemID] = React.useState('');

    var voteType= "";
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
  
    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

   

/////////////////////

    

    


    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const isItemSelected = isSelected(row.itemName);
                   
  
                    return (

                      
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        id={row.itemID}
                        key={row.itemName}
                        selected={isItemSelected}
                      >
                        
                        
                        <TableCell padding="checkbox">
                          <IconButton color = 'primary' aria-label="add">
                            <StarBorderIcon></StarBorderIcon>
                          </IconButton>

                          
                        
                        </TableCell>
                        <TableCell>
                        {(row.itemType=='Exam'|| row.itemType=='Quiz'|| row.itemType=='Assignment'|| row.itemType=='General'|| row.itemType=='Midterm'|| row.itemType=='None') &&
                          ( <div>
                          <HappyButton itemID = {row.itemID} mood = 'Happy'></HappyButton>
                          <OKButton itemID = {row.itemID} mood = 'Ok'></OKButton>
                          <SadButton itemID = {row.itemID} mood = 'Sad'></SadButton>
  
                          </div>)
                        }
                        {(row.itemType=='Lecture'|| row.itemType=='Lab'|| row.itemType=='Tutorial') &&
                          ( 
                            <div>
                      

                          <AttendButton itemID = {row.itemID} mood = 'Attend'></AttendButton>
                          <NotAttendButton itemID = {row.itemID} mood = 'NotAttend'></NotAttendButton>
             
                          </div>
                          )
                        
                        
                        }
                        </TableCell>
                                              
                        <TableCell component="th" scope="row" padding="none">
                          {row.itemName}
                        </TableCell>
                        <TableCell align="right">{row.class}</TableCell>
                        <TableCell align="right">{row.itemType}</TableCell>
                        <TableCell align="right">{format(row.date, 'dddd MMM. DD')}</TableCell>
                        <TableCell align="right">{<DateCountdown dateTo ={row.date} />}</TableCell>
                       
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
        </Paper>
      </div>
    );

  }

const AddTimelineItem = (props) => {

    const addTimeline =  () => {
      callApiAddTimelineItem()
        .then(res => {
          var parsed = JSON.parse(res.express);
        })
    } 
    
    const callApiAddTimelineItem = async () => {
  
      const url = serverURL + "/api/addTimelineItem"
    
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.item)
    
      });
      const body = await response.json();
      if (response.status != 200) throw Error(body.item);
      return body;
    
    }
  
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      
      setOpen(false);
    };
  
    const handlePost = () => {
      addTimeline()
      setOpen(false);
    };
  
  
    return(
        <div>
          <IconButton color = 'primary' aria-label="add" onClick={handleClickOpen}>
            <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
          </IconButton>
          
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Timeline Item</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter details for the timeline item.
              </DialogContentText>
             
              <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              onChange={(event)=>{
                props.name(event.target.value)
                console.log(event.target.value)
    
              }}
            />
              
            <Selection topic={props.topic}>
            </Selection>

            <ItemType type={props.type}>
            </ItemType>  
    
            <SelectDate date={props.date}></SelectDate>

            </DialogContent>

            

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handlePost} color="primary">
                Post
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
  
  }

  const Selection = (props) => {

    return(
    <FormControl variant="filled" style={{minWidth: 300}}>
          <InputLabel id="sort">Filter by:</InputLabel>
          <Select
            labelId="sortBySelector"
            id="sortBySelector"
            onChange={(event)=>{        
              props.topic(event.target.value)
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

const ItemType = (props) => {

  return(
    <FormControl variant="filled" style={{minWidth: 300}}>
    <InputLabel id="sort">Item Type:</InputLabel>
    <Select
      labelId="sortBySelector"
      id="sortBySelector"
      onChange={(event)=>{        
        props.type(event.target.value)
        console.log(event.target.value)
  
      }}
    >
      <MenuItem value=""><em>None</em></MenuItem>
      <MenuItem value={'Quiz'}>Quiz</MenuItem>
      <MenuItem value={'Exam'}>Exam</MenuItem>
      <MenuItem value={'Assignment'}>Assignment</MenuItem>
      <MenuItem value={'Lecture'}>Lecture</MenuItem>
      <MenuItem value={'Lab'}>Lab</MenuItem>
      <MenuItem value={'Tutorial'}>Tutorial</MenuItem>
      <MenuItem value={'General'}>General</MenuItem>
    </Select>
  </FormControl>
  )
}

const SelectDate = (props) => {

  return(
    <FormControl variant="filled" style={{minWidth: 300}}>
    
    <TextField
        id="date"
        label="Due Date"
        type="date"
        
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event)=>{        
          props.date(event.target.value)
          console.log(event.target.value)

        }}
      />
  </FormControl>
  )
}


