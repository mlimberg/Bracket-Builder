import { combineReducers } from 'redux';
import tournament from './newTournament';
import allTournaments from './fromFirebase';

const rootReducer = combineReducers({
  tournament,
  allTournaments
})

export default rootReducer;
