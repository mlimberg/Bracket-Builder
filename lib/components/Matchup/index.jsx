import React, { Component } from 'react';
import { Link } from 'react-router';

export class Matchup extends Component {
  constructor() {
    super();
    this.state={
      tournyName: 'fuckit'
    }
  }

  render() {
    return (
      <div>
        Matchup!

        <Link to={`/dashboard/${this.state.tournyName}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/bracket/${this.state.tournyName}`}>
          <button>Bracket</button>
        </Link>

      </div>
    )
  }
}

export default Matchup;
