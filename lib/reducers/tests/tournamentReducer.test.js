import newTournament from '../newTournament';

describe('newTournament reducer', () => {

  it('should return default state of an empty object', () => {
    expect(newTournament(undefined, {})).toEqual({})
  })

  it('should return a tournament object if SET_TOURNAMENT is the action type', () => {
    const tournament = { name: 'Gonshow',
                         qty: 8,
                         teams: [{id: 1}, {id: 2}, {id: 3}]
                       }
    const state = {};
    const action = {
      type: 'SET_TOURNAMENT',
      tournament
    }
    expect(newTournament(state, action)).toEqual(action.tournament)
  })

  it('should return tournament object with updated teams array', () => {
    const state = { name: 'Gonshow',
                         qty: 8,
                         teams: [{id: 1, name: 'Team1'}]}
    const expected = { name: 'Gonshow',
                         qty: 8,
                         teams: [{id: 1, name: 'Team Destruction'}]
                       }
    const team = {Team1: 'Team Destruction'}
    const action = {
      type: 'NEW_TEAM',
      team
    }
    expect(newTournament(state, action)).toEqual(expected)
  })

  it('should replace the teams array if UPDATE_TEAMS is the action type', () => {
    const state = {
      teams: [1,2,3,4]
    }
    const expected = {
      teams: [5,6,7,8]
    }
    const teams = [5,6,7,8]

    const action = {
      type: 'UPDATE_TEAMS',
      teams
    }

    expect(newTournament(state, action)).toEqual(expected)
  })

  it('should return a new state with a new matchup if SET_MATCHUP is the action type', () => {
    const state = {
      matchup: { team1: 'blue', team2: 'red'}
    }
    const matchup = { team1: 'gold', team2: 'purple'}
    const action = {
      type: 'SET_MATCHUP',
      matchup
    }
    const expected = {
      matchup: matchup
    }

    expect(newTournament(state, action)).toEqual(expected)
  })

})
