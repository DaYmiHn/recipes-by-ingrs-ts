import { ADD_TASK, REMOVE_TASK, TOOGLE_TASK } from '../store/constants'

const TASKS = [
  {
    id: 1,
    text: 'Leafsfsdrn ReactJS',
    isCompleted: true,
  },
  {
    id: 2,
    text: 'Learn Redux',
    isCompleted: false,
  },
  {
    id: 3,
    text: 'Learn React Router',
    isCompleted: false,
  }
];

interface ITask {
  id: any,
  text: string,
  isCompleted: boolean,
  type: string
}
const tasks = (state=TASKS, {id, text, isCompleted, type}:ITask) => {
  switch (type){
    case ADD_TASK:
      return [
        ...state, {
          id: id,
          text: text,
          isCompleted: isCompleted
        }
      ];
    case REMOVE_TASK:
      return [ ...state].filter(task => task.id !== id);
    case TOOGLE_TASK:
      return [ ...state].map(task =>{
        console.log(id)
        if(task.id === id){
          task.isCompleted = !task.isCompleted
        }
        return task
      } );
    default:
      return state;
  }
}

export default tasks;