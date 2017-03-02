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
    const heightToggle = tournament.qty >= 16 ? '100vh' : '40vh';
    const widthToggle = tournament.qty >= 16 ? '75%' : '50%'

    const bracket = tournament.rounds.map((round, j) => {
      return (
        <div key={j} className={`round round-${j + 1}`}>
          {round.map((match, i) => {
            return (
                <Link to={`/matchup/${match.matchId}`}
                      onClick={() => this.setCurrentMatchup(match)}
                      key={i}
                      // style={{backgroundColor: match.team1.color}}
                      className='matchup'>
                  <div className='game game-top'
                       style={{ color: match.team1.color}}
                       >{match.team1.name}</div>
                  <div className='game game-bottom'>{match.team2.name}</div>
                </Link>
            )
          })}
        </div>
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

          <main className='bracket-container tournament'
                style={{ height: heightToggle, width: widthToggle }}>
          {bracket}
          </main>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(Bracket);
