import React, { Component } from 'react';
import Login from './screens/auth';
import Main from './screens/main';
import Loader from './components/loader';
import axiosService from './components/axios';

import {connect} from 'react-redux';
import { addTask, removeTask, toogleTask, changeFilter, loginUser } from './actions/actionCreator'



interface IProps {
  tasks: any,
  removeTask: any,
  toogleTask: any,
  filters: any,
  changeFilter: any,
  addTask: any,
  loginUser: any,
}

interface IState {
  login: boolean,
  ingredient: Array<string> | null,
  users: string | null,
  recipe:  object
}


class Application extends Component<IProps, IState> {

  constructor(props : IProps) {
    super(props);

    this.state = {
      login: false,
      ingredient:[],
      users: '',
      recipe: {}
    };
  }

  async componentDidMount() {
    let data = await axiosService.get('/recipes')
    
    console.log(this.state.recipe)
    const {tasks, addTask, removeTask, toogleTask, filters, changeFilter, loginUser} = this.props;
    setTimeout(()=>{
      addTask((new Date).getTime(), 'taskText', false)
    }, 2000)
    console.log(tasks)
  }

  test(){
    this.setState({login: true})
  }


  render() {
    if(this.state.login === undefined) {
      return <Loader />;
    } else if(this.state.login) {
      return <Main profile={this.state.login}/>;
    }
    return <Login test={()=>{this.test()}} loginUser={this.props.loginUser} />;
  }
}

// export default connect(({tasks, filters}:{tasks:any, filters:any}) => ({
//   tasks, 
//   filters
// }), {addTask, removeTask, toogleTask, changeFilter, loginUser})(Application);


const mapStateToProps = (state:any) => {
  return {
    tasks: state.tasks,
    filters: state.filters
  }
}
export default connect((mapStateToProps), {addTask, removeTask, toogleTask, changeFilter, loginUser})(Application);