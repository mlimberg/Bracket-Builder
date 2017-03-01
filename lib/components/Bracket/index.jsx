import './bracket-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';

export class Bracket extends Component {
  constructor() {
    super();
  }

  setCurrentMatchup(match) {
    this.props.setMatchup(match)
  }

  render() {
    const { tournament } = this.props

    const roundOne = tournament.round1.map(match => {
        return (
          <div key={match.matchId}
               className='bracket-matchup'
               onClick={() => this.setCurrentMatchup(match)}>
            <Link to={`/matchup/${match.matchId}`}>
              <li className='spacer'>&nbsp;</li>
              <li className='game game-top'>{match.team1.name}</li>
              <li className='game game-spacer'>&nbsp;</li>
              <li className='game game-bottom'>{match.team2.name}</li>
              <li className='spacer'>&nbsp;</li>
            </Link>
          </div>
        )
      })

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>
        <section className='sub-header-section'>
          <Link to={`/dashboard/${tournament.code}`}>
            <button>Dashboard</button>
          </Link>

          <Link to={`/teams/${tournament.code}`}>
            <button>Teams</button>
          </Link>

          <Link to={`/bracket/${tournament.code}/round2`}>
            <button>Next Round</button>
          </Link>

          <main className='bracket-container'>

            <ul className='round round-1'>
              {roundOne}
            </ul>

          </main>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(Bracket);
