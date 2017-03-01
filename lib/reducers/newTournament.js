//likely remove this
import firebase from '../firebase';


const setTournament = (state={}, action) => {
  switch(action.type) {
    case 'SET_TOURNAMENT':
      return action.tournament;
    case 'NEW_TEAM':
      const key = Object.keys(action.team)
      state.teams = state.teams.map(t => {
        t.name === key[0] ? t.name = action.team[key] : t
        return t })
      return state
    case 'UPDATE_TEAMS':
      const updated = Object.assign({}, state, { teams: action.teams })
      return updated;
    case 'SET_MATCHUP':
      state.matchup = action.matchup;
      return state;
    case 'SET_FIRST_ROUND':
      const updatedRounds = state.rounds.slice();
      updatedRounds[0] = action.matchups;
      state.rounds = updatedRounds;
      return state;
    case 'SUBMIT_WINNER':
      const updatedRound = state.round1.map(match => {
        return match.matchId === action.match.matchId ? action.match : match
      })
      state.round1 = updatedRound;
      return state;
    case 'SET_ROUNDS':
      const updatedWithRounds = Object.assign({}, state, { rounds: action.rounds })
      return updatedWithRounds;
    default:
      return state;
  }
}

export default setTournament;
