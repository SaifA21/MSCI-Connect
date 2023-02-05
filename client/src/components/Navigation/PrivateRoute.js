import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import SignUp from "../SignUp";
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={SignUp} />
      </Switch>
    </Router>
  );
}