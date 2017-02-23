import './randomize-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';
import TeamCard from '../TeamCard/TeamCard';
import { shuffle } from '../../helpers/helpers';

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
    this.setState({
      east: this.props.teams.filter((t, i) => i % 2 === 0),
      west: this.props.teams.filter((t, i) => i % 2 !== 0)
    })
  }

  division(div) {
    const evenTeam = (i) => {return i % 2 === 0 ? true : false }
    return div.map((team, i) => {
      return (
        <div key={'west' + i}>
          <TeamCard team={team.name} addClass={evenTeam(i) ? '' : 'odd-team-card'}/>
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
    
  }

  render() {
    const { east, west, count } = this.state;

    return (
      <div>
        Randomize Teams!

        <h3>East</h3>
        {this.division(east)}

        <h3>West</h3>
        {this.division(west)}

        <button onClick={this.randomizeDivisions.bind(this)}
                disabled={!count}>
          Randomize
        </button>

        <p>Randomizers Left: {count}</p>

        {/* <Link to={`/dashboard/${this.state.tbd}`}> */}
          <button onClick={this.saveTournament.bind(this)}>Create Tournament</button>
        {/* </Link> */}

      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
