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

    const bracketWidth = () => {
      switch(tournament.qty) {
        case 4:
          return '20%';
        case 8:
          return '40%';
        case 16:
          return '60%';
        case 32:
          return '80%';
      }
    }
    const bracketHeight = () => {
      switch(tournament.qty) {
        case 4:
          return '40vh';
        case 8:
          return '60vh';
        case 16:
          return '80vh';
        case 32:
          return '105vh';
      }
    }

    const dimensions = {
      width: bracketWidth(),
      height: bracketHeight()
    }

    const bracket = tournament.rounds.map((round, j) => {
      return (
        <div key={j} className={`round round-${j + 1}`}>
          {round.map((match, i) => {
            return (
                <Link to={`/matchup/${match.matchId}`}
                      onClick={() => this.setCurrentMatchup(match)}
                      key={i}
                      className='matchup'>
                  <div className='game game-top'>{match.team1.name}</div>
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
        <section className='sub-header-section-bracket'>
          <div className='bracket-btn-container'>
            <Link to={`/dashboard/${tournament.code}`}>
              <button className='btn'>Dashboard</button>
            </Link>

            <Link to={`/teams/${tournament.code}`}>
              <button className='btn'>Teams</button>
            </Link>
          </div>

          <main className='bracket-container tournament'
                style={dimensions}>
          {bracket}
          </main>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(Bracket);
