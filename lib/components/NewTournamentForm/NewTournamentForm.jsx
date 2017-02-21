import React, { Component } from 'react';
import { Link } from 'react-router';

export class NewTournamentForm extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        New Tourny Form!

        <Link to='/'>
          <button>Back</button>
        </Link>

        <Link to='/set_teams'>
          <button>Next</button>
        </Link>


      </div>
    )
  }
}

export default NewTournamentForm;
