import './dashboard-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class Dashboard extends Component {
  constructor() {
    super();
    this.state={
    }
  }

  leaveTournament() {
    console.log('leaving!');
  }

  render() {
    const { tournament } = this.props
    const teamsLeft = 'TBD'

    return (
      <div>
        <h1>{tournament.name}</h1>

        <h3>{`Total Teams: ${tournament.qty}`}</h3>
        <h3>{`Teams Remaining: ${teamsLeft}`}</h3>
        <h3>{`Tournament Code: ${tournament.code}`}</h3>

        <Link to={`/teams/${this.state.tournyName}`}>
          <button>Teams</button>
        </Link>

        <Link to={`/bracket/${this.state.tournyName}`}>
          <button>Bracket</button>
        </Link>

        <Link to='/'>
          <button onClick={this.leaveTournament.bind(this)}>Leave Tournament</button>
        </Link>
      </div>
    )
  }
}

export default TournamentContainer(Dashboard);
