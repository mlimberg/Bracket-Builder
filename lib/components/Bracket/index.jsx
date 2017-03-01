import './bracket-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';
import firebase from '../../firebase';

export class Bracket extends Component {
  constructor(props) {
    super(props);
  }

  setCurrentMatchup(match) {
    this.props.setMatchup(match)
  }

  render() {
    const roundNum = parseInt(this.props.params.round_num);
    const { tournament } = this.props;

    const bracket = tournament.rounds.map((round, j) => {
      return (
        <ul key={j} className={`round round-${j + 1}`}>
          {round.map((match, i) => {
            return (
              <span key={i}
                   className='bracket-matchup'
                   onClick={() => this.setCurrentMatchup(match)}>
                <Link to={`/matchup/${match.matchId}`}>
                  <li className='spacer'>&nbsp;</li>
                  <li className='game game-top'>{match.team1.name}</li>
                  <li className='game game-spacer'>&nbsp;</li>
                  <li className='game   game-bottom'>{match.team2.name}</li>
                  <li className='spacer'>&nbsp;</li>
                </Link>
              </span>
            )
          })}
        </ul>
      )
    })

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>
        <section className='sub-header-section'>
          <div className='bracket-btn-container'>
            <Link to={`/dashboard/${tournament.code}`}>
              <button className='btn'>Dashboard</button>
            </Link>

            <Link to={`/teams/${tournament.code}`}>
              <button className='btn'>Teams</button>
            </Link>
          </div>

          <main className='bracket-container tournament'>

          {bracket}

          </main>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(Bracket);
