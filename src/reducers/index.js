import followeesReducer from './followees'
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  followees: followeesReducer
});

export default allReducers;