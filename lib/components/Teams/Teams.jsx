import React, { Component } from 'react';
import { Link } from 'react-router';
import TeamCard from '../TeamCard/TeamCard';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class Teams extends Component {
  constructor() {
    super();
    this.state={
      tournyName: 'fuckit'
    }
  }

  render() {
    const { tournament } = this.props

    return (
      <div>
        {tournament.name}

        <Link to={`/dashboard/${tournament.name}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/bracket/${tournament.name}`}>
          <button>Bracket</button>
        </Link>

      </div>
    )
  }
}

export default TournamentContainer(Teams);
