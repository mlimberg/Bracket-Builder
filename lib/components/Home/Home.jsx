import './home-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../firebase';
import AllTournamentsContainer from '../../containers/AllTournaments/AllTournamentsContainer';
import { Router } from 'react-router';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      showJoin: false,
      joinCode: '',
      joinError: false
    }
  }

//probably a better way to do this...but it works!
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  componentWillMount() {
    firebase.database().ref().on('value', (snapshot) => {
      const obj = snapshot.val();
      const keys = Object.keys(obj)
      const allTournaments = keys.map(key => obj[key])
      this.props.loadFromFirebase(allTournaments)
    })
  }

  joinExistingForm() {
    if(this.state.showJoin)
    return (
      <div className='join-existing-container'>
        <input placeholder='Enter Code'
               value={this.state.joinCode}
               onChange={(e) => this.setState({ joinCode: e.target.value })}/>
        <button disabled={!this.state.joinCode}
                onClick={this.joinExisting.bind(this)}>Join</button>
      </div>
    )
  }

  joinExisting() {
    const { tournaments } = this.props;
    let tournament;
    tournaments.forEach(obj => {
      if(obj.code === this.state.joinCode) {
        tournament = obj;
        this.setState({ joinError: false, joinCode: '' })
        this.context.router.push(`/dashboard/${tournament.code}`)
      }
    })
    return tournament ? tournament : this.setState({ joinError: true });
  }

  joinError() {
    if(this.state.joinError)
    return (
      <div className='join-error-msg'>There are no matching tournmanets, please enter another code or create a new tournament</div>
    )
  }

  render() {

    return(
      <div>

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
    )
  }
}

export default AllTournamentsContainer(Home);
