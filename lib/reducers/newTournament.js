const newTournament = (state={}, action) => {
  switch(action.type) {
    case 'NEW_TOURNAMENT':
      return action.tournament
    default:
      return state;
  }
}

export default newTournament;
