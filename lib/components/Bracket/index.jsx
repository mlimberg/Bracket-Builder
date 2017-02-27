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

  setCurrentMatchup(match) {
    this.props.setMatchup(match)
  }

  render() {
    const { tournament } = this.props

    const roundOne = (div) => {
      return div.map(match => {
        return(
          <div key={match.match_id}
               className='bracket-matchup'
               onClick={() => this.setCurrentMatchup(match)}>
            <Link to={`/matchup/${match.match_id}`}>
              <li className='spacer'>&nbsp;</li>
              <li className='game game-top'>{match.teamA.name}</li>
              <li className='game game-spacer'>&nbsp;</li>
              <li className='game game-bottom'>{match.teamB.name}</li>
              <li className='spacer'>&nbsp;</li>
            </Link>
          </div>
        )
      })
    }

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>
        <Link to={`/dashboard/${tournament.name}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/teams/${tournament}`}>
          <button>Teams</button>
        </Link>

        <Link to={`/matchup/${this.state.tournyName}`}>
          <button>Matchup</button>
        </Link>

        <main className='bracket-container'>
          <ul className='round round-1'>
            {roundOne(tournament.east)}

            {roundOne(tournament.west)}
          </ul>

          {/* <ul className='round round-2'>
            <li className='spacer'>&nbsp;</li>
            <li className='game game-top'>Test Name</li>
            <li className='game game-spacer'>&nbsp;</li>
            <li className='game game-bottom'>Test Name</li>
            <li className='spacer'>&nbsp;</li>
            <li className='game game-top'>Test Name</li>
            <li className='game game-spacer'>&nbsp;</li>
            <li className='game game-bottom'>Test Name</li>
            <li className='spacer'>&nbsp;</li>
          </ul> */}
        </main>

      </div>
    )
  }
}

export default TournamentContainer(Bracket);
