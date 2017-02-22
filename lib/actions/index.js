export const newTournament = (tournament) => {
  return {
    type: 'NEW_TOURNAMENT',
    tournament
  }
}

export const addTeam = (team) => {
  return {
    type: 'NEW_TEAM',
    team
  }
}
