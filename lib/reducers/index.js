import { combineReducers } from 'redux';
import handleCount from './handleCount';
import toFirebase from './toFirebase';
import newTournament from './newTournament';

const rootReducer = combineReducers({
  handleCount,
  toFirebase,
  newTournament
})

export default rootReducer;
