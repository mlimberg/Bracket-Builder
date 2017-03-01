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
    return match
    })
    this.props.updateNextRound(round, updated)
  }

  handleSubmit() {
    const winner = this.matchWinner()
    const { matchup, tournament } = this.props;
    if(matchup.round !== tournament.rounds.length) {
      this.submitWinner()
      this.updateTeams()
    } else {
      this.props.setChampion(winner)
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

  render() {
    const { tournament, matchup } = this.props;
    const finalRoundCheck = this.finalRoundCheck();

    return (
      <div>
        <h1>{tournament.name}</h1>

        <section className='sub-header-section'>
          <Link to={`/dashboard/${tournament.code}`}>
            <button>Dashboard</button>
          </Link>

          <Link to={`/bracket/${tournament.code}/`}>
            <button>Bracket</button>
          </Link>

          <div className='match-details'>
            <div className='teamA-details'>
              <h3>{matchup.team1.name}</h3>
              {/* <InlineEdit text={matchup.team1.score}
                          paramName='teamA-score'
                          change={this.updateScore.bind(this)} /> */}
              <p>{matchup.team1.score}</p>

            </div>

            <div className='teamB-details'>
              <h3>{matchup.team2.name}</h3>
              {/* <InlineEdit text={matchup.team2.score}
                          paramName='teamB-score'
                          change={this.updateScore.bind(this)} /> */}
              <p>{matchup.team2.score}</p>

            </div>
          </div>

          <div className='dropdown-container'>
            <select onChange={this.setWinner.bind(this)}>
              <option value='default'>Select Winner</option>
              <option value={matchup.team1.team_id}>{matchup.team1.name}</option>
              <option value={matchup.team2.team_id}>{matchup.team2.name}</option>
            </select>
          </div>

          {/* <Link to={`/bracket/${tournament.code}`}> */}
          <Link to={finalRoundCheck}>
            <button disabled={!this.state.winnerId}
                    onClick={this.handleSubmit.bind(this)}>
              Submit
            </button>
          </Link>

        </section>
      </div>
    )
  }
}

export default TournamentContainer(Matchup);
