import './match-styles';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import TournamentContainer from '../../containers/Tournament';
import InlineEdit from 'react-edit-inline';
import Dropdown from 'react-dropdown';

export class Matchup extends Component {
  constructor() {
    super();
    this.state={
      winnerId: '',
    }
  this.updateScore = this.updateScore.bind(this)
  }

  setWinner(e) {
    this.setState({ winnerId: parseInt(e.target.value)})
  }

  matchWinner() {
    const { matchup } = this.props
    const winner = Object.keys(matchup).reduce((obj, key) => {
      if(matchup[key].team_id === this.state.winnerId) {
        obj = matchup[key]
      }
      return obj
    }, {})
    return winner
  }

  submitWinner() {
    const winner = this.matchWinner()
    const { matchup } = this.props;
    const round = matchup.round - 1
    const updatedMatchup = Object.assign({}, matchup, { winner: winner })
    this.props.submitWinner(round, updatedMatchup)
    this.updateNextRound(winner)
  }

  updateNextRound(winner) {
    const { tournament, matchup } = this.props;
    const round = matchup.round;
    const id = Math.ceil(matchup.matchId/2);
    const team1Id = matchup.team1.team_id;
    const team2Id = matchup.team2.team_id;
    const updated = tournament.rounds[round].map(match => {
      if(match.matchId === id && match.matchId !== (matchup.matchId/2)) {
        match.team1 = winner
      } else if(match.matchId === id && match.matchId === (matchup.matchId/2)) {
        match.team2 = winner
      }
      ['team1', 'team2'].forEach(team => match[team].score = 0)
    return match
    })
    this.props.updateNextRound(round, updated)
  }

  handleSubmit() {
    if(this.state.winnerId) {
      const winner = this.matchWinner()
      const { matchup, tournament } = this.props;
      if(matchup.round !== tournament.rounds.length) {
        this.submitWinner()
        this.updateTeams()
      } else {
        this.props.setChampion(winner)
      }
    }
  }

  updateTeams() {
    const { tournament, matchup, updateTeams } = this.props;
    const keys = Object.keys(matchup);
    const loserId = keys.reduce((team, key) => {
      if(matchup[key].team_id && matchup[key].team_id !== this.state.winnerId) {
        team = matchup[key].team_id
      }
      return team
    }, 0)
    const updatedTeams = tournament.teams.map(teamObj => {
      if(teamObj.team_id === loserId) {
        teamObj.eliminated = true
      }
      return teamObj
    })
    updateTeams(updatedTeams);
  }

  finalRoundCheck() {
    const { matchup, tournament } = this.props
    return matchup.round === tournament.rounds.length ? `/champion/${tournament.code}` : `/bracket/${tournament.code}`
  }

  updateScore(e, id) {
    const op = e.target.innerHTML
    this.props.updateTeamScore(op, id)
  }

  render() {
    const { tournament, matchup } = this.props;
    const finalRoundCheck = this.finalRoundCheck();

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>

        <section className='sub-header-section'>
          <div className='matchup-btn-container'>
            <Link to={`/dashboard/${tournament.code}`}>
              <button className='btn'>Dashboard</button>
            </Link>

            <Link to={`/bracket/${tournament.code}/`}>
              <button className='btn'>Bracket</button>
            </Link>
          </div>
          <div className='match-details'>
            <div className='teamA-details team-dtls'>
              <h3 className='team-title'>{matchup.team1.name}</h3>
              <p className='team-score'>{matchup.team1.score}</p>
              <div className='update-score-btns'>
              <button className='score-btn' name='p1' onClick={(e) => this.updateScore(e, 'team1')}>+</button>
              <button className='score-btn' name='p1' onClick={(e) => this.updateScore(e, 'team1')}>-</button>
            </div>

            </div>

            <div className='teamB-details team-dtls'>
              <h3 className='team-title'>{matchup.team2.name}</h3>
              <p className='team-score'>{matchup.team2.score}</p>
              <div className='update-score-btns'>
                <button className='score-btn' name='p1' onClick={(e) => this.updateScore(e, 'team2')}>+</button>
                <button className='score-btn' name='p1' onClick={(e) => this.updateScore(e, 'team2')}>-</button>
              </div>

            </div>
          </div>

          <div className='dropdown-container'>
            <select onChange={this.setWinner.bind(this)}
                    className='dropdown'>
              <option value='default'>Select Winner</option>
              <option value={matchup.team1.team_id}>{matchup.team1.name}</option>
              <option value={matchup.team2.team_id}>{matchup.team2.name}</option>
            </select>

          <Link to={finalRoundCheck}>
            <button disabled={!this.state.winnerId}
                    onClick={this.handleSubmit.bind(this)}
                    className='btn'>
              Submit
            </button>
          </Link>
        </div>

        </section>
      </div>
    )
  }
}

export default TournamentContainer(Matchup);
