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

})
