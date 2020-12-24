import { combineReducers } from 'redux';
import tasks from './tasks';
import user from './users';
import recipes from './recipes';
import filter from './filter';

const rootReducer = combineReducers({
  tasks,
  user,
  recipes,
  filter,
});

export default rootReducer;
