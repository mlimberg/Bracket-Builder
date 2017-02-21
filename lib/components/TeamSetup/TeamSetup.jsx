import React, { Component } from 'react';
import { Link } from 'react-router';

export class TeamSetup extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Team Setup

        <Link to='/randomize'>
          <button>Next</button>
        </Link>
      </div>
    )
  }
}

export default TeamSetup;
