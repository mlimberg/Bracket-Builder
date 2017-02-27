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

    const sortedTeams = tournament.teams.sort((a, b) => {
      const teamA = a.name.toLowerCase()
      const teamB = b.name.toLowerCase();
      if(teamA < teamB) return -1
      if(teamA > teamB) return 1
      return 0
    })

    const teams = sortedTeams.map(team => {
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
