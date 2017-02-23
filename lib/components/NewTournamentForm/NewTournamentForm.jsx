import './new-tournament-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';

export class NewTournamentForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      qty: 0,
      code: '',
      teams: []
    }
  }

  setNewTournament() {
    this.props.newTournament(this.state)
  }

  setQty(e) {
    const quantity = parseInt(e.target.innerHTML)
    this.setState({ qty: quantity }, () => {
      this.setTeams()
    });
  }

  setTeams() {
    const temp = [];
    for(let i = 1; i <= this.state.qty; i++) {
      temp.push({ id: i, name: `Team ${i}`})
    }
    this.setState({ teams: temp })
  }

  setCode(e) {
    const code = e.target.value
    this.setState({ code: code })
  }

  preventSpace(e) {
    if(e.keyCode === 32)
    e.preventDefault()
  }

  render() {
    const toggleActive = (qty) => {
      return this.state.qty === qty ? 'team-qty-option active-qty' : 'team-qty-option'
    }

    return (
      <div className='new-tournament-form-container'>
        <h3>New Tourny Form!</h3>

        <section>
          <Link to='/'>
            <button className='btn back-btn'>Back</button>
          </Link>

          <Link to='/set_teams'>
            <button className='btn next-btn'
                    onClick={this.setNewTournament.bind(this)}>Next</button>
          </Link>
        </section>

        <label className='tournament-name'>
          Tournament Name:
          <input onChange={e => this.setState({ name: e.target.value })}/>
        </label>

        <section className='team-qty-container'>
          # of Teams:
            <div className='qty-options'>
              <div className={toggleActive(4)} onClick={this.setQty.bind(this)}>4</div>

              <div className={toggleActive(8)} onClick={this.setQty.bind(this)}>8</div>

              <div className={toggleActive(16)} onClick={this.setQty.bind(this)}>16</div>

              <div className={toggleActive(32)} onClick={this.setQty.bind(this)}>32</div>
            </div>
          </section>

        <label className='tournament-code'>
          Tournament code (no-spaces):
          <input onKeyDown={this.preventSpace.bind(this)} onChange={this.setCode.bind(this)}/>
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

export default TournamentContainer(NewTournamentForm);
