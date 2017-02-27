import './bracket-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class Bracket extends Component {
  constructor() {
    super();
    this.state={

    }
  }

  render() {
    return (
      <div>
        <h1>{tournament}</h1>
        <Link to={`/dashboard/${this.state.tournyName}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/teams/${this.state.tournyName}`}>
          <button>Teams</button>
        </Link>

        <Link to={`/matchup/${this.state.tournyName}`}>
          <button>Matchup</button>
        </Link>


      </div>
    )
  }
}

export default Bracket;
