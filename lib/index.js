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
import Bracket from './components/Bracket/Bracket';
import Teams from './components/Teams/Teams';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/'>
        <IndexRoute component={Home} />
        <Route path='/new' component={NewTournamentForm} />
        <Route path='/set_teams' component={TeamSetup} />
        <Route path='/randomize' component={RandomizeTeams} />
        <Route path='/dashboard/:tourney_id' component={Dashboard} />
        <Route path='/bracket/:tourney_id' component={Bracket} />
        <Route path='/teams/:tourney_id' component={Teams} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('application'));
