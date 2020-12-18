import { combineReducers } from 'redux';
import tasks from './tasks';
import user from './users';

const rootReducer = combineReducers({
  tasks,
  user
});

export default rootReducer;
