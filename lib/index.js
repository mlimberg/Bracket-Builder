// import './reset'
import './styles';
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

import App from './components/App/App';
import Home from './components/Home/Home';
import NewTournamentForm from './components/NewTournamentForm/NewTournamentForm';
import TeamSetup from './components/TeamSetup/TeamSetup';
import RandomizeTeams from './components/RandomizeTeams/RandomizeTeams';
import Dashboard from './components/Dashboard/Dashboard';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/'>
        <IndexRoute component={Home} />
        <Route path='/new' component={NewTournamentForm} />
        <Route path='/set-teams' component={TeamSetup} />
        <Route path='/randomize' component={RandomizeTeams} />
        <Route path='/dashboard/:tourney-name' component={Dashboard} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('application'));
