import './team-setup-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import InlineEdit from 'react-edit-inline';
import TeamCard from '../TeamCard';
import TournamentContainer from '../../containers/Tournament';
import { shuffle } from '../../helpers';

export class TeamSetup extends Component {
  constructor() {
    super();
    this.state = {
      teamName: '',
      teamList: [],
    }
  }

  noTeamsError() {
    return (
      <div>No teams selected, please click back to set up a new bracket</div>
    )
  }

  updateTeams(e) {
    this.props.addTeam(e)
  }

  teamList() {
    const { teams } = this.props.tournament
    if(teams) {
      return teams.map((team, i) => {
        return (
          <div className='teamList-container' key={i}>
            <InlineEdit className='team-card'
                        activeClassName='team-card'
                        paramName={team.name}
                        change={(e)=> this.updateTeams(e)}
                        text={team.name} />
          </div>
        )
      })
    } else {
      return this.noTeamsError()
    }
  }

  shuffleTeams() {
    this.props.updateTeams(shuffle(this.props.tournament.teams))
  }

  render() {

    return (
      <div>
        <h1>{this.props.tournament.name}</h1>
        <h3>Team Setup</h3>
        <p>Click to edit team names</p>
        {this.teamList()}

      <div className='setup-nav-buttons'>
        <Link to='/new'>
          <button>Back</button>
        </Link>
        <Link to='/randomize'>
          <button onClick={this.shuffleTeams.bind(this)}>Next</button>
        </Link>
      </div>

      </div>
    )
  }
}

export default TournamentContainer(TeamSetup);
