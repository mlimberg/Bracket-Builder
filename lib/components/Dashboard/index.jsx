import './dashboard-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament';
import firebase from '../../firebase';

export class Dashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase.database().ref().push(this.props.tournament)
  }

  leaveTournament() {
    this.props.setTournament({})
  }

  render() {
    const { tournament } = this.props
    const teamsLeft = 'TBD'

    return (
      <div>
        <h1 className='page-header'>{tournament.name}</h1>

        <section className='sub-header-section'>
          <h3 className='dashboard-info'>
            <span className='label'>Total Teams: </span>
            {tournament.qty}
          </h3>

          <h3 className='dashboard-info'>
            <span className='label'>Teams Remaining: </span>
            {teamsLeft}
          </h3>

          <h3 className='dashboard-info'>
            <span className='label'>Tournament Code: </span>
            {tournament.code}
          </h3>

          <div className='dash-btn-container'>
            <Link to={`/teams/${tournament.code}`}>
              <button className='btn dashboard-btn'>
                Teams
              </button>
            </Link>

            <Link to={`/bracket/${tournament.code}`}>
              <button className='btn dashboard-btn'>
                Bracket
              </button>
            </Link>

            <Link to='/'>
              <button onClick={this.leaveTournament.bind(this)}
                      className='dashboard-btn leave-btn'>
                Leave Tournament
              </button>
            </Link>
          </div>
        </section>
      </div>
    )
  }
}

export default TournamentContainer(Dashboard);
