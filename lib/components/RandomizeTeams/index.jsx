import './randomize-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';
import TeamCard from '../TeamCard';
import { shuffle } from '../../helpers';
import firebase from '../../firebase';

export class RandomizeTeams extends Component {
  constructor() {
    super();
    this.state = {
      east: [],
      west: [],
      count: 3
    }
  }

  componentDidMount() {
    const { teams } = this.props.tournament
    this.setState({
      east: teams.filter((t, i) => i % 2 === 0),
      west: teams.filter((t, i) => i % 2 !== 0)
    })
  }

  division(div, divColor) {
    const color = this.props.tournament[divColor]
    const evenTeam = (i) => {return i % 2 === 0 ? true : false }
    return div.map((team, i) => {
      return (
        <div key={div + i}>

          <TeamCard team={team.name}
                    addClass={evenTeam(i) ? '' : 'odd-team-card'}
                    style={{backgroundColor: color }} />

          <span className='vs-text'>{evenTeam(i) ? 'vs.' : ''}</span>

        </div>
      )
    })
  }

  randomizeDivisions() {
    const { count, east, west } = this.state
    this.setState({
      east: shuffle(east),
      west: shuffle(west),
      count: count - 1
    })
  }

  createRounds() {
    const { tournament, createTournamentRounds } = this.props
    let tournamentRounds = [];
    let numOfTeams = tournament.qty;
    const numOfRounds = Math.log(numOfTeams)/Math.log(2);
    for(let i = 0; i < numOfRounds; i++) {
      numOfTeams /= 2
      let roundArray = [];
      for(let j = 1; j <= numOfTeams; j++) {
        roundArray.push({
          matchId: j,
          winner: '',
          team1: '',
          team2: '',
          round: i + 1
        })
      }
      tournamentRounds.push(roundArray)
    }
    createTournamentRounds(tournamentRounds)
    this.setDivisions()
  }

  setDivisions() {
    const { east, west } = this.state
    const { tournament } = this.props
    const eastUpdate = east.slice().map(team => {
      team.division = 'east'
      team.color = tournament.eastColor
      return team
    })
    const westUpdate = west.slice().map(team => {
      team.division = 'west'
      team.color = tournament.westColor
      return team
    })
    const updatedTeams = [...eastUpdate, ...westUpdate]
    this.props.updateTeams(updatedTeams)
    this.createMatchups(updatedTeams)
  }

  createMatchups(updatedTeams) {
    const teamsCopy = updatedTeams.slice();
    const length = this.props.tournament.qty/2;
    const round1 = [];
    console.log(this.props.tournament.rounds);
    for(let i=1; i<=length; i++) {
      const matchup = Object.assign({}, {
        matchId: i,
        winner: '',
        team1: teamsCopy.splice(0, 1)[0],
        team2: teamsCopy.splice(0, 1)[0],
        round: 1
      })
      round1.push(matchup);
    }
    this.props.setFirstRound(round1)
  }

  render() {
    const { east, west, count } = this.state;
    const { code, name } = this.props.tournament;
    const eastDivision = this.division(east, 'eastColor')
    const westDivision = this.division(west, 'westColor')

    return (
      <div>

        <h1 className='page-header'>{name}</h1>
        <section className='sub-header-section'>
          <h3>East</h3>
          {eastDivision}

          <h3>West</h3>
          {westDivision}

          <button onClick={this.randomizeDivisions.bind(this)}
                  disabled={!count}>
            Randomize
          </button>

          <p>Randomizers Left: {count}</p>

          <Link to={`/dashboard/${name}`}>
            <button onClick={this.createRounds.bind(this)}>Create Tournament</button>
          </Link>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
