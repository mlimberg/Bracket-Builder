import React, { Component } from 'react';
import { Link } from 'react-router';

export class Bracket extends Component {
  constructor() {
    super();
    this.state={
      tournyName: 'fuckit'
    }
  }

  render() {
    return (
      <div>
        Bracket!

        <Link to={`/dashboard/${this.state.tournyName}`}>
          <button>Dashboard</button>
        </Link>

        <Link to={`/teams/${this.state.tournyName}`}>
          <button>Teams</button>
        </Link>

        <Link to={`/matchup/${this.state.tournyName}`}>
          <button>Matchup</button>
        </Link>


      </div>
    )
  }
}

export default Bracket;
