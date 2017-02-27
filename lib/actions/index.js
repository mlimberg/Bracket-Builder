export const setTournament = (tournament) => {
  return {
    type: 'SET_TOURNAMENT',
    tournament
  }
}

export const addTeam = (team) => {
  return {
    type: 'NEW_TEAM',
    team
  }
}

export const updateTeams = (teams) => {
  return {
    type: 'UPDATE_TEAMS',
    teams
  }
}

export const saveTournament = (east, west) => {
  return {
    type: 'SAVE_TOURNAMENT',
    east,
    west
  }
}

export const loadFromFirebase = (tournaments) => {
  return {
    type: 'LOAD_TOURNAMENTS',
    tournaments
  }
}
