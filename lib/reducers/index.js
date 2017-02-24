import { combineReducers } from 'redux';
import currentTournament from './newTournament';
import allTournaments from './fromFirebase';

const rootReducer = combineReducers({
  currentTournament,
  allTournaments
})

export default rootReducer;
