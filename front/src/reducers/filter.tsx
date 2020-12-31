import { CHANGE_FILTER } from '../store/constants'
import axiosService from '../components/axios';

interface IRecipe {
  activeFilter: object,
  type: string
}


const filter = (state={
  count_ingr: '',
  miss_ingr: '',
  picture: '',
  category: '',
  page: 1,
}, {activeFilter, type}:IRecipe) => {
  switch (type){
    case CHANGE_FILTER:
      console.log({
        ...state,
        ...activeFilter
      })
      return {
        ...state,
        ...activeFilter
      }
    default:
      return state;
  }
}

export default filter;