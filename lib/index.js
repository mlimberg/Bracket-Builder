// import './reset'
import './styles';
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

// import App from './components/App/App';
import Home from './components/Home';
import NewTournamentForm from './components/NewTournamentForm';
import TeamSetup from './components/TeamSetup';
import RandomizeTeams from './components/RandomizeTeams';
import Dashboard from './components/Dashboard';
import Bracket from './components/Bracket';
import Teams from './components/Teams';
import Matchup from './components/Matchup';
import Round from './components/Round';

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
        <Route path='/dashboard/:tournament_name' component={Dashboard} />
        <Route path='/bracket/:tournament_code/:round_num' component={Bracket} />
        {/* <Route path='/bracket/:tournament_name/:round_num' component={Round} /> */}
        <Route path='/teams/:tournament_name' component={Teams} />
        <Route path='/matchup/:matchup_id' component={Matchup} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('application'));
