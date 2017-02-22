import './team-setup-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import InlineEdit from 'react-edit-inline';
import TeamCard from '../TeamCard/TeamCard';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

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
    if(this.props.teams) {
      return this.props.teams.map((team, i) => {
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
    const copy = this.props.teams.slice()
    for (let i = copy.length; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [copy[i - 1], copy[j]] = [copy[j], copy[i - 1]];
    }
    this.props.shuffle(copy)
  }

  render() {

    return (
      <div>
        Team Setup
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
