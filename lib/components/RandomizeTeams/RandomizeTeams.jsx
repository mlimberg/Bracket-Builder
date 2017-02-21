import React, { Component } from 'react';
import { Link } from 'react-router';

export class RandomizeTeams extends Component {
  constructor() {
    super();
    this.state = {
      id: 'deleteMe',
    }
  }

  render() {
    return (
      <div>
        Randomize Teams!

        <button>Randomize</button>

        <Link to={`/dashboard/${this.state.id}`}>
          <button>Create Tournament</button>
        </Link>

      </div>
    )
  }
}

export default RandomizeTeams;
