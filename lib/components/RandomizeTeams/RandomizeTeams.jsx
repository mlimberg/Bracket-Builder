import './randomize-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';
import TeamCard from '../TeamCard/TeamCard';

export class RandomizeTeams extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  eastDivision() {
    const east = this.props.teams.filter((t, i) => i % 2 === 0)
    return east.map((team, i) => {
      return (
        <div key={'east' + i}>
          <TeamCard team={team.name} />
        </div>
      )
    })
  }

  westDivision() {
    const west = this.props.teams.filter((t, i) => i % 2 !== 0)
    return west.map((team, i) => {
      return (
        <div key={'west' + i}>
          <TeamCard team={team.name} />
        </div>
      )
    })
  }

  render() {

    return (
      <div>
        Randomize Teams!

        <h3>East</h3>
        {this.eastDivision()}

        <h3>West</h3>
        {this.westDivision()}

        <button>Randomize</button>

        <Link to={`/dashboard/${this.state.id}`}>
          <button>Create Tournament</button>
        </Link>

      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
