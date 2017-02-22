import React, { Component } from 'react';
import { Link } from 'react-router';
import TeamCard from '../TeamCard/TeamCard';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class TeamSetup extends Component {
  constructor() {
    super();
    this.state = {
      teamList: [],
    }
  }

  teamList() {
    return this.props.teams.map((team, i) => {
      return (
        <div key={i}>
          {team.name}
        </div>
      )
    })
  }

  render() {

    return (
      <div>
        Team Setup
        {this.teamList()}
        <Link to='/randomize'>
          <button>Next</button>
        </Link>
      </div>
    )
  }
}

export default TournamentContainer(TeamSetup);
