import './teams-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TeamCard from '../TeamCard';
import TournamentContainer from '../../containers/Tournament';
import { sortByAlpha } from '../../helpers';

export class Teams extends Component {
  constructor() {
    super();
    this.state={

    }
  }

  render() {
    const { tournament } = this.props

    const sortedTeams = sortByAlpha(tournament.teams)

    const teams = sortedTeams.map(team => {
      return (
        <div key={team.team_id}>
          <TeamCard team={team.name}
                    style={{backgroundColor: team.color }}
                    addClass={team.eliminated ? 'team-card eliminated' : 'team-card'}/>
        </div>
      )
    })

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>

        <section className='sub-header-section'>
          <div className='setup-nav-buttons'>
            <Link to={`/dashboard/${tournament.code}`}>
              <button className='btn'>Dashboard</button>
            </Link>

            <Link to={`/bracket/${tournament.code}`}>
              <button className='btn'>Bracket</button>
            </Link>
          </div>

          {teams}

        </section>

      </div>
    )
  }
}

export default TournamentContainer(Teams);
