import React, { Component } from 'react';
import { Link } from 'react-router';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      join: false,
    }
  }

  joinExistingForm() {
    if(this.state.join)
    return (
      <div>
        <input placeholder='Enter Code'/>
        <button>Join</button>
      </div>
    )
  }

  render() {
    return(
      <div>
        <Link to='/new'>
          <button>New Tournament</button>
        </Link>

        <button onClick={() => this.setState({ join: !this.state.join })}>Join Existing</button>
        
        {this.joinExistingForm()}
      </div>
    )
  }
}

export default Home
