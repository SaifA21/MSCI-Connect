import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Chat from "../Chat";
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

export default function PrivateRoute({
  
}) {


  const{currentUser} = useAuth()

  var defaultPage;

  if(currentUser == null){
    defaultPage = SignIn
  }

  else{
    
    defaultPage = Home}



  return (

    <Router history={history}>
      <Switch>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/home"  component={Home} />
      <Route path="/signin" exact component={SignIn} />
      <Route path="/lookup" exact component={LookUp} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/polls" exact component={Polls} />
      <Route path="/faq" exact component={FAQ} />
      <Route path="/tc" exact component={TC} />
      <Route path="/timeline" exact component={Timeline} />
      <Route path="/signout" exact component={SignOut} />
      <Route exact path='/' component={defaultPage} />
      </Switch>
    </Router>
  );
}