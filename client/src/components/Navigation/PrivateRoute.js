import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import  Chat from '../Chat'
import FAQ from "../FAQ";
import SignIn from "../SignIn";
import Home from '../Home';
import LookUp from "../LookUp";
import Polls from "../Polls";
import SignOut from "../SignOut";
import SignUp from "../SignUp";
import TC from "../TC";
import Timeline from "../Timeline";
import history from './history';
import { useAuth } from "../../contexts/AuthContext";
import Reset from "../Reset";
import Reported from "../Reported";

export default function PrivateRoute({
  
}) {


  const{currentUser} = useAuth()

  var defaultPage;
  var homePage;
  var chatPage;
  var timelinePage;
  var pollsPage;
  var faqPage;
  var studentLookUpPage;
  var tcPage;
  var reportedPage;


  if(currentUser == null){
    defaultPage = SignIn
    homePage = SignIn
    chatPage = SignIn
    timelinePage = SignIn
    pollsPage = SignIn
    faqPage = SignIn
    studentLookUpPage = SignIn
    tcPage = SignIn
    reportedPage = SignIn


  }

  else{
    
    defaultPage = Home
    homePage = Home
    chatPage = Chat
    timelinePage = Timeline
    pollsPage = Polls
    faqPage = FAQ
    studentLookUpPage = LookUp
    tcPage = TC
    reportedPage = Reported
  }



  return (

    <Router history={history}>
      <Switch>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/home"  component={homePage} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/lookup" exact component={studentLookUpPage} />
      <Route path="/chat" exact component={chatPage} />
      <Route path="/polls" exact component={pollsPage} />
      <Route path='/reported' exact component={reportedPage}/>
      <Route path="/faq" exact component={faqPage} />
      <Route path="/tc" exact component={tcPage} />
      <Route path="/timeline" exact component={timelinePage} />
      <Route path="/reset" exact component={Reset} />
      <Route path="/signout" exact component={SignOut} />
      <Route exact path='/' component={defaultPage} />
      </Switch>
    </Router>
  );
}