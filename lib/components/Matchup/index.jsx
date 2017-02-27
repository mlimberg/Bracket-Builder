import './match-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';

export class Matchup extends Component {
  constructor() {
    super();
    this.state={
    }
  }

  render() {
    const { tournament, matchup } = this.props;

    return (
      <div>
        <h1>{tournament.name}</h1>

        <Link to={`/dashboard/${tournament.name}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/bracket/${tournament.name}`}>
          <button>Bracket</button>
        </Link>

        <div className='match-details'>
          <div className='teamA-details'>
            <h3>{matchup.teamA.name}</h3>
            <div>{matchup.teamA.score}</div>
          </div>

          <div className='teamB-details'>
            <h3>{matchup.teamB.name}</h3>
            <div>{matchup.teamB.score}</div>
          </div>
        </div>


      </div>
    )
  }
}

export default TournamentContainer(Matchup);
