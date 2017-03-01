import './team-setup-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import InlineEdit from 'react-edit-inline';
import TeamCard from '../TeamCard';
import TournamentContainer from '../../containers/Tournament';
import { shuffle } from '../../helpers';
import SetupNavButtons from '../SetupNavButtons';

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
            <InlineEdit className='edit-team-card'
                        activeClassName='edit-team-card'
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
    const teamList = this.teamList();

    return (
      <div>
        <h1 className='page-header'>{this.props.tournament.name}</h1>

        <section className='sub-header-section'>

          <h3 className='page-title'>Click to edit team names</h3>

          <div className='team-list'>
            {teamList}
          </div>

          <SetupNavButtons back='/new'
                           backText='Back'
                           next='/randomize'
                           nextText='Next'
                           handleNextClick={this.shuffleTeams.bind(this)}/>

        </section>

      </div>
    )
  }
}

export default TournamentContainer(TeamSetup);
