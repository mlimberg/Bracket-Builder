import './randomize-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';
import TeamCard from '../TeamCard/TeamCard';

export class RandomizeTeams extends Component {
  constructor() {
    super();
    this.state = {
      east: [],
      west: []
    }
  }

  componentDidMount() {
    this.setState({
      east: this.props.teams.filter((t, i) => i % 2 === 0),
      west: this.props.teams.filter((t, i) => i % 2 !== 0)
    })
  }

  eastDivision() {
    const { east } = this.state;
    return east.map((team, i) => {
      return (
        <div key={'east' + i}>
          <TeamCard team={team.name} />
        </div>
      )
    })

  }

  westDivision() {
    const { west } = this.state;
    return west.map((team, i) => {
      return (
        <div key={'west' + i}>
          <TeamCard team={team.name} />
        </div>
      )
    })
  }

  randomizeDivisions() {
    console.log('random!');
  }

  render() {

    return (
      <div>
        Randomize Teams!

        <h3>East</h3>
        {this.eastDivision()}

        <h3>West</h3>
        {this.westDivision()}

        <button onClick={this.randomizeDivisions.bind(this)}>Randomize</button>

        <Link to={`/dashboard/${this.state.id}`}>
          <button>Create Tournament</button>
        </Link>

      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
