import { LOGIN_USER, LOGOUT_USER } from '../store/constants'


interface Iuser {
  user: object,
  type: string
}
const user = (state={}, {user, type}:Iuser) => {
  switch (type){
    case LOGIN_USER:
      return user;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}

export default user;