import React, {useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar.js'
import ChatItem from './ChatItem';
import { Typography } from '@material-ui/core';


const serverURL = ''


export default function Reported() {
    
    const[allowed,setAllowed]=useState(0)
    const[admin, setAdmin]=useState([{admin:0}])
    const[permitted,setPermitted]=useState({admin:0})
    const{currentUser} = useAuth()

    const[messages, setMessages]=useState([])

    const[emails,changeEmails]=useState([
      {
        "username":"Thev",
        "email":"t2nirmal@uwaterloo.ca"
      }
    ]);
  
    React.useEffect(() =>{
      loadEmails();
    },[])

    const loadEmails = () => {
    
      callApiLoadEmails()
      .then(res => {
          var parsed = JSON.parse(res.express);
          changeEmails(parsed)
        }
      ).then(console.log(emails))
    }
  
    const callApiLoadEmails = async (props) => {
      
      const url = serverURL + "/api/loadReportedEmails";
      const response = await fetch(url, {method: "POST"});
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }



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



      React.useEffect(() =>{
        setPermitted(admin[0]);
      },[admin])

    React.useEffect(() =>{
        checkAdmin();
      },[])

      React.useEffect(() =>{
        setAllowed(permitted.admin);
      },[permitted])


      React.useEffect(()=>{
        loadMessages()
      },[])
    

      const loadMessages = () => {
    
        callApiLoadMessages()
        .then(res => {
            var parsed = JSON.parse(res.express);
            console.log("parsed:"+parsed)
            setMessages(parsed);
          }
        ).then(console.log(messages))
      }
    
      const callApiLoadMessages = async (props) => {
        
        const url = serverURL + "/api/getReportedMessages";
        const response = await fetch(url, {method: "POST", headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify()});
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
      }

    return(



      <div>

        {allowed==1 &&(

            <div>
                <Navbar></Navbar>
                <h3>Reported Students</h3>
                {emails.map((item)=>{
        return(
          <div>

            <br></br>
      
            
            <Typography>{item.username} : {item.email}</Typography>
            <br></br>
          </div>
        )
      })}
      <h3>Chat Log</h3>
                {messages.map((item)=>{
                  return(
                    <div>
                      <br></br>
                      
                      <ChatItem chatID = {item.chatID} author={item.username} 
                      topic={item.class} content={item.content} 
                      reported ={item.reported}></ChatItem>

                      <br></br>
                    </div>



                    
                  )
                }
                
                
                
                
                )}
                
           </div>





           
        )}

      </div>
      

















    )





















}