import './new-tournament-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';
import { GithubPicker } from 'react-color';

export class NewTournamentForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      qty: 0,
      code: '',
      teams: [],
      showEast: false,
      showWest: false,
      eastColor: '#FFF',
      westColor: '#FFF',
      error: ''
    }
  }

  setNewTournament() {
    const { name, qty, code, teams, eastColor, westColor } = this.state;
      this.props.setTournament({ name, qty, code, teams, eastColor, westColor})
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
      temp.push({ team_id: i, name: `Team ${i}`})
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

  colorError() {
    if(!!this.state.eastColor && this.state.eastColor == this.state.westColor)
    return(<p>Division colors cannot match, please change your selections</p>)
  }

  setColor(div, color) {
    const division = div === 'West' ? 'westColor' : 'eastColor';
    const show = 'show' + div
    this.setState({ [division]: color.hex, [show]: false })
  }


  render() {
    const { qty, showEast, showWest, eastColor, westColor } = this.state;

    const toggleActive = (selected) => {
      return qty === selected ? 'team-qty-option active-qty' : 'team-qty-option'
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
                    onClick={this.setNewTournament.bind(this)}>
              Next
            </button>
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
          <input onKeyDown={this.preventSpace.bind(this)}
                 onChange={this.setCode.bind(this)}/>
        </label>

        <section className='division-color-selectors'>

          <label>
            West
            <div className='color-block-main'
                 style={{backgroundColor: this.state.westColor}}
                 onClick={() => this.setState({ showWest: !showWest })}>
            </div>
            {showWest ? <GithubPicker onChangeComplete={this.setColor.bind(this, 'West')}/> : null}
          </label>

          <label>
            East
            <div className='color-block-main'
                 style={{backgroundColor: this.state.eastColor}}
                 onClick={() => this.setState({ showEast: !showEast })}>
            </div>
            {showEast ? <GithubPicker onChangeComplete={this.setColor.bind(this, 'East')}/> : null}
          </label>

          {this.colorError()}

        </section>
      </div>
    )
  }
}

export default TournamentContainer(NewTournamentForm);
