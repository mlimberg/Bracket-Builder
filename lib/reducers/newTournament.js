const newTournament = (state={}, action) => {
  switch(action.type) {
    case 'NEW_TOURNAMENT':
      return action.tournament;
    case 'NEW_TEAM':
      const key = Object.keys(action.team)
      state.teams = state.teams.map(t => {
        t.name === key[0] ? t.name = action.team[key] : t
        return t })
      return state
    default:
      return state;
  }
}

export default newTournament;
