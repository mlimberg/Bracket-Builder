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
    const { tournament } = this.props;
    const length = tournament.qty/2;
    const round1 = [];
    for(let i=1; i<=length; i++) {
      const matchup = Object.assign({}, {
        matchId: i,
        winner: '',
        team1: updatedTeams.splice(0, 1)[0],
        team2: updatedTeams.splice(0, 1)[0]
      })
      round1.push(matchup);
    }
    console.log(round1);
  }

  // setDivisions() {
  //   const east = [];
  //   const west = [];
  //   const { tournament } = this.props;
  //   const eastCopy = this.state.east.slice();
  //   const westCopy = this.state.west.slice();
  //
  //   for(let i = 1; i <= length; i++) {
  //     let matchupE = Object.assign({}, {
  //       match_id: `east_${i}`,
  //       color: tournament.eastColor,
  //       winner: '',
  //       teamA: eastCopy.splice(0, 1)[0],
  //       teamB: eastCopy.splice(0, 1)[0]
  //     })
  //     let matchupW = Object.assign({}, {
  //       match_id: `west_${i}`,
  //       color: tournament.westColor,
  //       winner: '',
  //       teamA: westCopy.splice(0, 1)[0],
  //       teamB: westCopy.splice(0, 1)[0]
  //     })
  //     east.push(matchupE)
  //     west.push(matchupW)
  //   }
  //   this.updateTeams(east, west)
  // }

  updateTeams(east, west) {
    const { tournament } = this.props
    const updated = tournament.teams.map(team => {
      for(let j=0; j<east.length; j++) {
        if(team.team_id === east[j].teamA.team_id ||
           team.team_id === east[j].teamB.team_id) {
          team.color = east[j].color
          team.division = 'east'
          team.score = 0;
          return team
        } else if (team.team_id === west[j].teamA.team_id ||
                   team.team_id === west[j].teamB.team_id) {
          team.color = west[j].color
          team.division = 'west'
          team.score = 0;
          return team
        }
      }
    })
    this.props.updateTeams(updated)
    this.saveToFirebase();
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
