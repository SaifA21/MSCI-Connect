import * as React from 'react';
import { Typography, Card, CardActions, CardContent, Grid, AppBar, Box, Toolbar, Button, Select, MenuItem, FormControl, InputLabel, TextField, Radio, FormControlLabel, RadioGroup, FormLabel, FormHelperText, helperText, TableRow } from "@material-ui/core/";
import ReportIcon from '@material-ui/icons/Report';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAuth } from '../../../contexts/AuthContext';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';





const serverURL = ''



const reportMessageApi = (chatID, setReported, setReview) => {
  callReportMessageApi(chatID, setReported, setReview)
    .then(res => {
      var parsed = JSON.parse(res.express);
    })

}

const callReportMessageApi = async (chatID, setReported, setReview) => {

  const url = serverURL + "/api/reportMessage"

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatID)

  });
  const body = await response.json();
  if (response.status != 200) throw Error(body.message);
  setReported(1)
  setReview(1)
  return body;

}



const Report = (props) => {
  return (

    <div>



      {props.reported == 0 && (
        <div>
          <Grid
            container spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >

            <IconButton aria-label="report" onClick={() => reportMessageApi({ chatID: props.chatID }, props.setReported, props.setReview)}>
              <ReportIcon style={{ fontSize: 40 }} />
            </IconButton>

          </Grid>
        </div>
      )}


      {props.reported == 2 && (
        <div> <Grid
          container spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"

        >


          <CheckCircleIcon style={{ fontSize: 40 }} />
          <p>Approved by Class Rep</p>
        </Grid></div>

      )}



      {props.review == 1 && (

        <div>
          <Grid
            container spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >

            <VisibilityIcon style={{ fontSize: 40 }} />
            <Typography>Under Review</Typography></Grid>
        </div>


      )}




    </div>

  )
}

const ThumbsUp = (props) => {
  console.log(props.chatID);

  const chatVote = "upvote";
  const{currentUser} = useAuth()



  const addChatVote = async(props) => {
    console.log(chatVote) 
    callAddChatVote(props)
    .then(res => {
        var parsed = JSON.parse(res.express);
       
      }
    ).then(console.log())
  }

  const callAddChatVote = async (props) => {
    
    const url = serverURL + "/api/addChatVote";
    console.log(chatVote)
    const response = await fetch(url, {method: "POST", headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({voteChat: chatVote, chatID: props.chatID, firebaseID: currentUser.uid})});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  
  
  const handleChatVote = () => {
    console.log(props.chatID);
    addChatVote(props);
    window.location.reload();
  };
   

  
  return(
    <div> 
      
      <IconButton  onClick={handleChatVote} color = 'primary' aria-label="add" >
        <ThumbUpIcon></ThumbUpIcon>
        </IconButton>
    </div>
  )
  }

  const ThumbsDown = (props) => {
    console.log(props.chatID);
  
    const chatVote = "downvote";
    const{currentUser} = useAuth()
  
  
  
    const addChatVote = async(props) => {
      console.log(chatVote) 
      callAddChatVote(props)
      .then(res => {
          var parsed = JSON.parse(res.express);
         
        }
      ).then(console.log())
    }
  
    const callAddChatVote = async (props) => {
      
      const url = serverURL + "/api/addChatVote";
      console.log(chatVote)
      const response = await fetch(url, {method: "POST", headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({voteChat: chatVote, chatID: props.chatID, firebaseID: currentUser.uid})});
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }
  
    
    
    const handleChatVote = () => {
      console.log(props.chatID);
      addChatVote(props);
      window.location.reload();

    };
     
  
    
    return(
      <div> 
        
        <IconButton  onClick={handleChatVote} color = 'primary' aria-label="add" >
          <ThumbDownIcon></ThumbDownIcon>
          </IconButton>
      </div>
    )
    }


const MessageItem = (props) => {
  const { currentUser } = useAuth()
  const [reported, setReported] = React.useState(props.reported)
  const [review, setReview] = React.useState(reported)
  const [userID, setUserID] = React.useState(0)

  const callApiGetUserId = async () => {

    const url = serverURL + "/api/checkUserID"

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebaseID: currentUser.uid })

    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.update);
    return body;
  }

  const getUserID = () => {
    callApiGetUserId()
      .then(res => {
        var parsed = JSON.parse(res.express);
        console.log(typeof parsed[0].userID)
        setUserID(parsed[0].userID)
      }
      ).then(console.log(userID))
  }

  React.useEffect(() => {
    getUserID();
  }, [])

  const callApiDeleteChat = async () => {

    const url = serverURL + "/api/deleteChat"

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatID: props.chatID })

    });
    const body = await response.json();
    if (response.status != 200) throw Error(body.update);
    return body;
  }



  const DeleteChat = () => {

    const handleDeleteChat = (props) => {
      console.log('clicked')
      callApiDeleteChat(props.chatID)
        .then(res => {
          var parsed = JSON.parse(res.express);
        })
      window.location.reload(); 
    };


    return (
      <div>
        <IconButton onClick={handleDeleteChat}>
          <DeleteIcon style={{ fontSize: 40 }} />
        </IconButton>
      </div>
    )
  }




  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <Grid
          container spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >

          <Grid
            container spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >


            < Grid item style={{ minWidth: 1000 }} >
            

              <b><p>
                {props.author}
              </p></b>
              <Typography variant="h9" component="div">
                Topic: {props.topic}
              </Typography>
              <br></br>
              <Typography variant="body2">
                Content: {props.content}
                <br />
              </Typography>
              
              <ThumbsUp chatID = {props.chatID}></ThumbsUp>
                
                <ThumbsDown chatID = {props.chatID}></ThumbsDown>

            </Grid>

            < Grid item>
              <Report chatID={props.chatID} reported={reported} setReported={setReported} review={review} setReview={setReview}></Report>
            </Grid>


            {props.user_id == userID ? <Grid item>
              <DeleteChat></DeleteChat>
            </Grid> : <></>}

          </Grid>
        </Grid>

      </CardContent>

    </Card>
  );
}


export default (MessageItem);
