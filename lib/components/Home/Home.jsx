import './home-styles';
import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../firebase';
import AllTournamentsContainer from '../../containers/AllTournaments/AllTournamentsContainer';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      join: false,
      joinCode: '',
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
    if(this.state.join)
    return (
      <div className='join-existing-container'>
        <input placeholder='Enter Code'
               onChange={(e) => this.setState({ joinCode: e.target.value })}/>
        <button disabled={!this.state.joinCode}
                onClick={this.joinExisting.bind(this)}>Join</button>
      </div>
    )
  }

  joinExisting() {
    console.log('join!');
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
                  onClick={() => this.setState({ join: !this.state.join })}>
            Join Existing
          </button>
        </div>

        {this.joinExistingForm()}
      </div>
    )
  }
}

export default AllTournamentsContainer(Home);
