import React, { Component } from 'react';
import { Link } from 'react-router';
import './new-tournament-styles.scss';

export class NewTournamentForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      qty: 0,
      code: '',
    }
  }

  render() {
    return (
      <div>
        <h3>New Tourny Form!</h3>

        <section>
          <Link to='/'>
            <button>Back</button>
          </Link>

          <Link to='/set_teams'>
            <button>Next</button>
          </Link>
        </section>

        <label>
          Tournament Name:
          <input />
        </label>


        <section className='team-qty-container'>
          # of Teams:
            <div className='qty-options'>
              <div className='team-qty-option qty-4'>4</div>
              <div className='team-qty-option qty-8'>8</div>
              <div className='team-qty-option qty-16'>16</div>
              <div className='team-qty-option qty-32'>32</div>
            </div>
          </section>

        <label>
          Tournament code (no-spaces):
          <input />
        </label>

        <section className='division-color-selectors'>
          <div className='west-container'>
            West
            {/* <map>
              <area shape="rect" coords="7,7,31,30" href="#003300" />
              <area shape="rect" coords="35,7,59,30" href="#003366" />
            </map> */}
          </div>

          <div className='west-container'>
            East

          </div>

          <div className='east-container'>
          </div>
        </section>
      </div>
    )
  }
}

export default NewTournamentForm;
