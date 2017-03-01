import './dashboard-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';
import firebase from '../../firebase';

export class Dashboard extends Component {
  constructor() {
    super();
  }

  leaveTournament() {
    this.props.setTournament({})
  }

  render() {
    const { tournament } = this.props
    const teamsLeft = 'TBD'

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>

        <section className='sub-header-section'>
          <h3>{`Total Teams: ${tournament.qty}`}</h3>
          <h3>{`Teams Remaining: ${teamsLeft}`}</h3>
          <h3>{`Tournament Code: ${tournament.code}`}</h3>

          <Link to={`/teams/${tournament.code}`}>
            <button>Teams</button>
          </Link>

          <Link to={`/bracket/${tournament.code}/1`}>
            <button>Bracket</button>
          </Link>

          <Link to='/'>
            <button onClick={this.leaveTournament.bind(this)}>Leave Tournament</button>
          </Link>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(Dashboard);
