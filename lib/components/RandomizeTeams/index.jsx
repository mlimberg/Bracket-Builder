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
    for(let i=1; i<=length; i++) {
      const matchup = Object.assign({}, {
        matchId: i,
        winner: '',
        team1: teamsCopy.splice(0, 1)[0],
        team2: teamsCopy.splice(0, 1)[0]
      })
      round1.push(matchup);
    }
    this.props.setFirstRound(round1)
    //how to issue a promise???
    // firebase.database().ref().push(Object.assign(this.props.tournament, {round1: round1} ))
    // this.saveToFirebase();
  }

  saveToFirebase() {
    firebase.database().ref().push(this.props.tournament)
  }

  render() {
    const { east, west, count } = this.state;
    const { code, name } = this.props.tournament;

    return (
      <div>

        <h1 className='page-header'>{name}</h1>

        <h3>East</h3>
        {this.division(east, 'eastColor')}

        <h3>West</h3>
        {this.division(west, 'westColor')}

        <button onClick={this.randomizeDivisions.bind(this)}
                disabled={!count}>
          Randomize
        </button>

        <p>Randomizers Left: {count}</p>

        <Link to={`/dashboard/${name}`}>
          <button onClick={this.setDivisions.bind(this)}>Create Tournament</button>
        </Link>

      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
