import './new-tournament-styles.scss';
import React, { Component } from 'react';
import { Link } from 'react-router';
import TournamentContainer from '../../containers/Tournament/TournamentContainer';
import AllTournamentsContainer from '../../containers/AllTournaments/AllTournamentsContainer';
import { GithubPicker } from 'react-color';
import firebase from '../../firebase';

export class NewTournamentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      qty: 0,
      code: '',
      teams: [],
      showEast: false,
      showWest: false,
      eastColor: '#FFF',
      westColor: '#FFF',
      codeError: false
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

  setNewTournament() {
    const { name, qty, code, teams, eastColor, westColor } = this.state;
      this.props.setTournament({ name, qty, code, teams, eastColor, westColor })
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
      temp.push({ team_id: i, name: `Team ${i}`, eliminated: false })
    }
    this.setState({ teams: temp })
  }

  setCode(e) {
    const code = e.target.value.toUpperCase()
    this.setState({ code: code })
  }

  preventSpace(e) {
    if(e.keyCode === 32)
    e.preventDefault()
  }

  colorError() {
    const { eastColor, westColor } = this.state;
    if(eastColor == westColor && westColor !== '#FFF')
      return(<p>Division colors cannot match, please change your selections</p>)
  }

  setColor(div, color) {
    const division = div === 'West' ? 'westColor' : 'eastColor';
    const show = 'show' + div
    this.setState({ [division]: color.hex, [show]: false })
  }

  codeCheck() {
    const { tournaments } = this.props;
    let status = false;
    if(tournaments) {
      for(let i = 0; i < tournaments.length; i++) {
        if(tournaments[i].code === this.state.code) {
          status = true
        }
      }
    }
    this.setState({ codeError: status })
  }


  render() {
    const { qty, showEast, showWest, eastColor, westColor, codeError, code } = this.state;

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

          <Link to='/set-teams'>
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
          <div className='input-and-check'>
            <input value={code}
              onKeyDown={this.preventSpace.bind(this)}
              onChange={this.setCode.bind(this)}
              onKeyUp={this.codeCheck.bind(this)} />
              <span className={codeError ? 'code-red' : 'code-green'}>✓</span>
          </div>
        </label>

        <section className='division-color-selectors'>

          <label>
            West
            <div className='color-block-main'
                 style={{backgroundColor: this.state.westColor}}
                 onClick={() => this.setState({ showWest: !showWest })}>
            </div>
            {showWest ? <div className='color-picker'><GithubPicker onChangeComplete={this.setColor.bind(this, 'West')}/>
            </div> : null}
          </label>

          <label>
            East
            <div className='color-block-main'
                 style={{backgroundColor: this.state.eastColor}}
                 onClick={() => this.setState({ showEast: !showEast })}>
            </div>
            {showEast ? <div className='color-picker'><GithubPicker onChangeComplete={this.setColor.bind(this, 'East')}/>
            </div> : null}
          </label>

          {this.colorError()}

        </section>
      </div>
    )
  }
}

export default AllTournamentsContainer(TournamentContainer(NewTournamentForm));
