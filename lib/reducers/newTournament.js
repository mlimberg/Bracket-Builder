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
    case 'SET_COLORS':
      state.eastColor = action.east;
      state.westColor = action.west;
      return state;
    case 'SET_MATCHUP':
      state.matchup = action.matchup;
      return state;
    case 'SET_FIRST_ROUND':
      const updatedTournament = Object.assign({}, state, {round1: action.matchups})
      return updatedTournament;
    case 'SUBMIT_WINNER':
      const updatedRound = state.round1.map(match => {
        return match.matchId === action.match.matchId ? action.match : match
      })
      state.round1 = updatedRound;
      return state;
    default:
      return state;
  }
}

export default setTournament;
