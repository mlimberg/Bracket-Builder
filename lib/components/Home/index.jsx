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
               className='join-existing-input'
               value={joinCode}
               onChange={(e) => this.setState({ joinCode: e.target.value.toUpperCase() })}
               onKeyDown={this.preventSpaces.bind(this)}/>
        <button className='btn home-btn'
                disabled={!joinCode}
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
    const joinExisting = this.joinExistingForm();
    const joinError = this.joinError();

    return(
        <div className='homepage'>

          <div className='logo-container'>
            <img src={require('../../images/bracket_builder_logo.png')}
            className='logo'/>
          </div>

          <div className='home-btn-container'>
            <Link to='/new'>
            <button className='home-btn new-tournament-btn btn'>
              New Tournament
            </button>
          </Link>

          <button className='home-btn join-existing-btn btn'
            onClick={() => this.setState({ showJoin: !this.state.showJoin })}>
            Join Existing
          </button>
        </div>

        {joinExisting}
        {joinError}
      </div>
    )
  }
}

export default AllTournamentsContainer(Home);
