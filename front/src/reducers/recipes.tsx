import { LOAD_RECIPES, RESET_RECIPES } from '../store/constants'
import axiosService from '../components/axios';

interface IRecipe {
  recipes: object[],
  type: string
}
const recipes = (state=[], {recipes, type}:IRecipe) => {
  switch (type){
    case LOAD_RECIPES:
      return [
        ...state,
        ...recipes
      ]
    case RESET_RECIPES:
      return []
    default:
      return state;
  }
}

export default recipes;