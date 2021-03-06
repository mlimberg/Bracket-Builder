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
      const newMatchup = Object.assign({}, state, { matchup: action.matchup})
      return newMatchup;
    case 'SET_FIRST_ROUND':
      const updatedRounds = state.rounds.slice();
      updatedRounds[0] = action.matchups;
      state.rounds = updatedRounds;
      return state;
    case 'SUBMIT_WINNER':
      const index = action.round
      const updatedRound = state.rounds[index].map(match => {
        return match.matchId === action.match.matchId ? action.match : match
      })
      state.rounds[index] = updatedRound;
      return state;
    case 'SET_NEXT_ROUND':
      let newRounds = Object.assign({}, state)
      const updatedArray = newRounds.rounds[action.round].slice();
      newRounds.rounds[action.round] = action.matchups;
      return newRounds;
    case 'SET_ROUNDS':
      const updatedWithRounds = Object.assign({}, state, { rounds: action.rounds })
      return updatedWithRounds;
    case 'SET_CHAMPION':
      const objWithChamp = Object.assign({}, state, { champion: action.champion })
      return objWithChamp;
    case 'UPDATE_SCORE':
      let newScore = state.matchup[action.team].score
      newScore += action.op === '+' ? 1 : -1
      const newState = Object.assign({}, state)
      newState.matchup[action.team].score = newScore
      return newState
    default:
      return state;
  }
}

export default setTournament;
