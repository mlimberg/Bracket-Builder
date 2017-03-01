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

export const submitWinner = (round, match) => {
  return {
    type: 'SUBMIT_WINNER',
    round,
    match
  }
}

export const createTournamentRounds = (rounds) => {
  return {
    type: 'SET_ROUNDS',
    rounds
  }
}

export const updateNextRound = (round, matchups) => {
  return {
    type: 'SET_NEXT_ROUND',
    round,
    matchups
  }
}
