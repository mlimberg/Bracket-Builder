import './teams-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TeamCard from '../TeamCard/TeamCard';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class Teams extends Component {
  constructor() {
    super();
    this.state={

    }
  }

  render() {
    const { tournament } = this.props

    const teams = tournament.teams.map(team => {
      return (
        <div key={team.team_id}>
          <TeamCard team={team.name}
                    style={{backgroundColor: team.color }}
                    addClass={team.eliminated ? 'eliminated' : ''}/>
        </div>
      )
    })

    return (
      <div>
        <h1>{tournament.name}</h1>

        <Link to={`/dashboard/${tournament.name}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/bracket/${tournament.name}`}>
          <button>Bracket</button>
        </Link>

        {teams}

      </div>
    )
  }
}

export default TournamentContainer(Teams);
