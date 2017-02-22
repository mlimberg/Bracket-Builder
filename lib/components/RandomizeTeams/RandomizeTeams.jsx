import './randomize-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class RandomizeTeams extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    console.log(this.props.teams);
    return (
      <div>
        Randomize Teams!

        <h3>East</h3>

        <h3>West</h3>

        <button>Randomize</button>

        <Link to={`/dashboard/${this.state.id}`}>
          <button>Create Tournament</button>
        </Link>

      </div>
    )
  }
}

export default TournamentContainer(RandomizeTeams);
