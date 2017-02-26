import './randomize-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';
import TeamCard from '../TeamCard/TeamCard';
import { shuffle } from '../../helpers/helpers';
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

  division(div, divString) {
    const { tournament } = this.props;
    const color = tournament[divString]
    const evenTeam = (i) => {return i % 2 === 0 ? true : false }
    return div.map((team, i) => {
      return (
        <div key={div + i}>
          <TeamCard team={team.name} addClass={evenTeam(i) ? '' : 'odd-team-card'} style={{backgroundColor: color }}/>
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

  saveTournament() {
    const east = [];
    const west = [];
    const { tournament } = this.props;
    const eastCopy = this.state.east.slice();
    const westCopy = this.state.west.slice();
    const length = tournament.qty/4;

    for(let i = 1; i <= length; i++) {
      let matchupE = Object.assign({}, {
        match_id: `east_${i}`,
        status: 'inProgress',
        color: tournament.eastColor,
        teamA: eastCopy.splice(0, 1)[0],
        teamB: eastCopy.splice(0, 1)[0]
      })
      let matchupW = Object.assign({}, {
        match_id: `west{i}`,
        status: 'inProgress',
        color: tournament.westColor,
        teamA: westCopy.splice(0, 1)[0],
        teamB: westCopy.splice(0, 1)[0]
      })
      east.push(matchupE)
      west.push(matchupW)
    }
    this.props.saveTournament(east, west)
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
        Randomize Teams!

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
          <button onClick={this.saveTournament.bind(this)}>Create Tournament</button>
        </Link>

      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
