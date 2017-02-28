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

export const setMatchup = (matchup) => {
  return {
    type: 'SET_MATCHUP',
    matchup
  }
}

export const loadFromFirebase = (tournaments) => {
  return {
    type: 'LOAD_TOURNAMENTS',
    tournaments
  }
}

export const updateTeamScore = (id) => {
  return {
    type: 'UPDATE_SCORE',
    id
  }
}

export const setFirstRound = (matchups) => {
  return {
    type: 'SET_FIRST_ROUND',
    matchups
  }
}

export const submitWinner = (match) => {
  return {
    type: 'SUBMIT_WINNER',
    match
  }
}

export const setSecondRound = (matchups) => {
  return {
    type: 'SET_ROUND_2',
    matchups
  }
}
