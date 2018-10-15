import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store.js';
import { setCurrentUser } from './actions/authentication.js';

import setAuthToken from './actions/setAuthToken.js';

import Home from './containers/Home.js';
import Login from './containers/Login.js';
import Signup from './containers/Signup.js';
import EditQuiz from './containers/EditQuiz.js';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(localStorage.jwtToken));
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create-quiz' component={EditQuiz} />
            <Route exact path='/edit-quiz' component={EditQuiz} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
