import { combineReducers } from 'redux';
import gameReducer from './game_reducer';

const rootReducer = combineReducers({
  state: gameReducer,
});

export default rootReducer;
