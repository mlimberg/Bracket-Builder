import { combineReducers } from 'redux';
import handleCount from './handleCount';
import toFirebase from './toFirebase';
import tournament from './newTournament';

const rootReducer = combineReducers({
  handleCount,
  toFirebase,
  tournament
})

export default rootReducer;
