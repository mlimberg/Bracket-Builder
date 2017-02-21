import React, { Component } from 'react';
import { Link } from 'react-router';

export class Dashboard extends Component {
  constructor() {
    super();
    this.state={
      tournyName: 'fuckit'
    }
  }

  render() {
    return (
      <div>
        Dashboard!

        <Link to={`/teams/${this.state.tournyName}`}>
          <button>Teams</button>
        </Link>

        <Link to={`/bracket/${this.state.tournyName}`}>
          <button>Bracket</button>
        </Link>

      </div>
    )
  }
}

export default Dashboard;
