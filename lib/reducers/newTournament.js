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
      state.teams = action.teams;
      return state;
    case 'SAVE_TOURNAMENT':
      state.east = action.east;
      state.west = action.west;
      return state;
    case 'SET_COLORS':
      state.eastColor = action.east;
      state.westColor = action.west;
      return state;
    case 'SET_MATCHUP':
      state.matchup = action.matchup;
      return state;
    default:
      return state;
  }
}

export default setTournament;
