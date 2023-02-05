import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import SignUp from '../SignUp';
import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import { AuthProvider } from '../../contexts/AuthContext';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
      <AuthProvider>
	  <Router>
	    <div>
        <PrivateRoute exact path="/" component={SignUp}/>
	    </div>
	  </Router>
    </AuthProvider>
    );
  }
}

export default App;