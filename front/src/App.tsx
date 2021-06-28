import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import Login from './screens/auth';
import Main from './screens/main';
import Loader from './components/loader';
import axiosService from './components/axios';

import {
  addTask, removeTask, toogleTask, changeFilter, loginUser,
} from './actions/actionCreator';

interface IProps {
  tasks: any,
  removeTask: any,
  toogleTask: any,
  filters: any,
  changeFilter: any,
  addTask: any,
  loginUser: any,
  user: any,
}

interface IState {
  login: boolean,
  ingredient: Array<string> | null,
  users: string | null,
  recipe: object
}

class Application extends Component<IProps, IState> {
  constructor(props : IProps) {
    super(props);

    this.state = {
      login: false,
      ingredient: [],
      users: '',
      recipe: {},
    };
  }

  async componentDidMount() {
    try {
      const {
        tasks, addTask, removeTask, toogleTask, filters, changeFilter, loginUser, user,
      } = this.props;

      const token:any = window.localStorage.getItem('userToken');
      if (token === null) throw new Error('Отсутствует токен');
      const code:any = jwt_decode(token);

      if (Date.now() >= code.exp * 1000) {
        throw new Error('Токен истек');
      } else {
        console.log(code);
        loginUser(code);
        this.logined();
      }
    } catch (error) {
      switch (error.message) {
        case 'Отсутствует токен':
          console.log(error.message);
          break;
        default:
          console.log('Вход не выполнен');
      }
    }
  }

  logined() {
    this.setState({ login: true });
  }

  render() {
    if (this.state.login === undefined) {
      return <Loader />;
    } if (this.state.login && this.props.user !== {}) {
      return <Main profile={this.props.user} />;
    }
    return <Login logined={() => { this.logined(); }} loginUser={this.props.loginUser} />;
  }
}

// export default connect(({tasks, filters}:{tasks:any, filters:any}) => ({
//   tasks,
//   filters
// }), {addTask, removeTask, toogleTask, changeFilter, loginUser})(Application);

const mapStateToProps = (state:any) => ({
  tasks: state.tasks,
  filters: state.filters,
  user: state.user,
});
export default connect((mapStateToProps), {
  addTask, removeTask, toogleTask, changeFilter, loginUser,
})(Application);
