import { ADD_TASK, REMOVE_TASK, TOOGLE_TASK, CHANGE_FILTER, LOGIN_USER } from '../store/constants'

export const addTask = (id:any, text:string, isCompleted:boolean) => ({
  type: ADD_TASK,
  id,
  text,
  isCompleted
});

export const removeTask = (id:any) => ({
  type: REMOVE_TASK,
  id
});

export const toogleTask = (id:any) => ({
  type: TOOGLE_TASK,
  id
});

export const changeFilter = (activeFilter:string) => ({
  type: CHANGE_FILTER,
  activeFilter
});

export const loginUser = (user:object) => ({
  type: LOGIN_USER,
  user
});