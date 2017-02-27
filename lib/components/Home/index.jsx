import './home-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../firebase';
import AllTournamentsContainer from '../../containers/AllTournaments';
import { Router, browserHistory } from 'react-router';


export class Home extends Component {
  constructor() {
    super();
    this.state = {
      showJoin: false,
      joinCode: '',
      joinError: false
    }
  }

  componentWillMount() {
    firebase.database().ref().on('value', (snapshot) => {
      const obj = snapshot.val();
      if(snapshot.val()) {
        const keys = Object.keys(obj)
        const allTournaments = keys.map(key => obj[key])
        this.props.loadFromFirebase(allTournaments)
      }
    })
  }

  preventSpaces(e) {
    if(e.keyCode === 32)
    e.preventDefault()
  }

  joinExistingForm() {
    const { showJoin, joinCode } = this.state;
    if(showJoin)
    return (
      <div className='join-existing-container'>
        <input placeholder='Enter Code'
               value={joinCode}
               onChange={(e) => this.setState({ joinCode: e.target.value.toUpperCase() })}
               onKeyDown={this.preventSpaces.bind(this)}/>
        <button disabled={!joinCode}
                onClick={this.joinExisting.bind(this)}>Join</button>
      </div>
    )
  }

  joinExisting() {
    const { tournaments } = this.props;
    let tournament;
    tournaments.forEach(obj => {
      if(obj.code === this.state.joinCode) {
        tournament = Object.assign({}, obj);
        this.setState({ joinError: false, joinCode: '' })
        browserHistory.push(`/dashboard/${tournament.name}`)
      }
    })
    return tournament ? this.setCurrent(tournament) : this.setState({ joinError: true });
  }

  setCurrent(tournament) {
    this.props.setTournament(tournament);
  }

  joinError() {
    if(this.state.joinError)
    return (
      <div className='join-error-msg'>There are no matching tournmanets, please enter another code or create a new tournament</div>
    )
  }

  render() {

    return(
      <div className='overlay'>
        <div className='homepage'>

          <img src={require('../../images/bracket_builder_logo.png')}
          className='logo'/>

          <div className='home-btn-container'>
            <Link to='/new'>
            <button className='btn new-tournament-btn'>
              New Tournament
            </button>
          </Link>

          <button className='btn join-existing-btn'
            onClick={() => this.setState({ showJoin: !this.state.showJoin })}>
            Join Existing
          </button>
        </div>

        {this.joinExistingForm()}
        {this.joinError()}
      </div>
      </div>
    )
  }
}

export default AllTournamentsContainer(Home);
