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

  it('should return state with new first round array if SET_FIRST_ROUND is action type', () => {
    const state = {
      rounds: [[{id: 1}, {id: 2}], [{id: 1}]]
    }
    const matchups = [{id: 4}, {id: 6}];
    const expected = {
      rounds: [[{id: 4}, {id: 6}], [{id: 1}]]
    }
    const action = {
      type: 'SET_FIRST_ROUND',
      matchups
    }
    expect(newTournament(state, action)).toEqual(expected)
  })

  it('should return state that has rounds updated with winner if SUBMIT_WINNER is action type', () => {
    const state = {
      rounds: [[{ matchId: 1, winner: '' }, { matchId: 2, winner: '' }], [{ matchId: 1, winner: '' }]]
    }
    const round = 0
    const match = {matchId: 2, winner: 'GREG'}
    const action = {
      type: 'SUBMIT_WINNER',
      round,
      match
    }
    const expected = {
      rounds: [[{ matchId: 1, winner: '' }, { matchId: 2, winner: 'GREG' }], [{ matchId: 1, winner: '' }]]
    }
    expect(newTournament(state, action)).toEqual(expected)
  })

  it('should update state with new array within rounds if SET_NEXT_ROUND is action type', () => {
    const state = {
      rounds: [[{ matchId: 1, winner: '' }, { matchId: 2, winner: '' }], [{ matchId: 1, winner: '' }]]
    }
    const round = 1;
    const matchups = [{matchId: 1, winner: 'GREG'}]
    const action = {
      type: 'SET_NEXT_ROUND',
      round,
      matchups
    }
    const expected = {
      rounds: [[{ matchId: 1, winner: '' }, { matchId: 2, winner: '' }], [{ matchId: 1, winner: 'GREG' }]]
    }
    expect(newTournament(state, action)).toEqual(expected)
  })

  it('should set intial rounds array if SET_ROUNDS is action type', () => {
    const state = {}
    const rounds = [[{}, {}, {}, {}], [{}, {}]];
    const action = {
      type: 'SET_ROUNDS',
      rounds
    }
    const expected = {
      rounds: [[{}, {}, {}, {}], [{}, {}]]
    }
    expect(newTournament(state, action)).toEqual(expected);
  })

  it('should set a champion property to state if SET_CHAMPION is action type', () => {
    const state = {};
    const champion = {name: 'Chuck Norris'}
    const action = {
      type: 'SET_CHAMPION',
      champion
    }
    const expected = {
      champion: {name: 'Chuck Norris'}
    }
    expect(newTournament(state,action)).toEqual(expected)
  })

})
