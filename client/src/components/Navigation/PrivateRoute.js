import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Chat from "../chat";
import FAQ from "../FAQ";
import Home from '../Home';
import LookUp from "../LookUp";
import Polls from "../Polls";
import SignIn from "../SignIn";
import SignOut from "../SignOut";
import SignUp from "../SignUp";
import TC from "../TC";
import Timeline from "../Timeline";
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/SignUp" exact component={SignUp} />
      <Route exact path="/home"  component={Home} />
      <Route path="/SignIn" exact component={SignIn} />
      <Route path="/lookup" exact component={LookUp} />
      <Route path="/chat" exact component={Chat} />
      <Route path="/polls" exact component={Polls} />
      <Route path="/faq" exact component={FAQ} />
      <Route path="/tc" exact component={TC} />
      <Route path="/timeline" exact component={Timeline} />
      <Route path="/signout" exact component={SignOut} />
      </Switch>
    </Router>
  );
}