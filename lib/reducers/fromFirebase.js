import firebase from '../firebase';

const fromFirebase = (state=[], action) => {
  switch(action.type) {
    case 'LOAD_TOURNAMENTS':
      state.allTournaments = action.tournaments
      return state.allTournaments;
    default:
      return state;
  }
}

export default fromFirebase;
