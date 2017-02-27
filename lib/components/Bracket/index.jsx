import './bracket-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';

export class Bracket extends Component {
  constructor() {
    super();
    this.state={

    }
  }

  render() {
    const { tournament } = this.props

    const roundOne = (div) => {
      return div.map(match => {
        return(
          <div key={match.match_id} className='backet-matchup'>
            <li className='game game-top'>{match.teamA.name}</li>
            <li className='game game-spacer'>&nbsp;</li>
            <li className='game game-bottom'>{match.teamB.name}</li>
            <li className='spacer'>&nbsp;</li>
          </div>
        )
      })
    }

    return (
      <div>
        <h1>{tournament.name}</h1>
        <Link to={`/dashboard/${tournament.name}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/teams/${tournament}`}>
          <button>Teams</button>
        </Link>

        <Link to={`/matchup/${this.state.tournyName}`}>
          <button>Matchup</button>
        </Link>

        <div className='bracket-container'>
          <ul className='round round-1'>
            {roundOne(tournament.east)}
          </ul>

          <ul className='round round-1'>
            {roundOne(tournament.west)}
          </ul>
        </div>

      </div>
    )
  }
}

export default TournamentContainer(Bracket);
