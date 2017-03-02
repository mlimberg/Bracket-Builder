import allTournaments from '../fromFirebase';

describe('allTournaments Reducer', () => {

  it('should return a prop of all tournaments if LOAD_TOURNAMENTS is action type', () => {
    const state = []
    const tournaments = [{id: 1}, {id: 2}, {id: 3}];
    const action = {
      type: 'LOAD_TOURNAMENTS',
      tournaments
    }
    const expected = [{id: 1}, {id: 2}, {id: 3}]
    
    expect(allTournaments(state, action)).toEqual(expected);
  })

})
