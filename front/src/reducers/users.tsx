import { LOGIN_USER } from '../store/constants'


interface Iuser {
  user: object,
  type: string
}
const user = (state={}, {user, type}:Iuser) => {
  switch (type){
    case LOGIN_USER:
      return user;
    default:
      return state;
  }
}

export default user;