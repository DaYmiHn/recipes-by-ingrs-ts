import React, { Component } from 'react';
import axiosService from '../components/axios';
import jwt_decode from "jwt-decode";

interface IProps {
  logined: Function,
  loginUser: Function,
}
interface IState {
  email: string | null,
  password: string | null,
  error: any,
}


class Auth extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      email: '',
      password:'',
      error: {},
      
    };
  }

  async login(){
    try {
      let {data} = await axiosService.post('/auth/login',  { 
        email: this.state.email,
        password: this.state.password
      })
      window.localStorage.setItem('userToken',data.access_token)
      console.log(jwt_decode(data.access_token))
      this.props.loginUser(jwt_decode(data.access_token))
      this.props.logined()
    } catch (error) {
      alert('Так не пойдёт....')
    }
  }

  async register(){
    try {
      let {data} = await axiosService.post('/auth/register',  { 
        email: this.state.email,
        password: this.state.password
      })
      console.log(data)
      window.localStorage.setItem('userToken',data.access_token)
      console.log(jwt_decode(data.access_token))
      this.props.loginUser(jwt_decode(data.access_token))
      this.props.logined()
    } catch (error) {
      alert('Так не пойдёт....')
    }
  }

  render() {
    return <div className="row">
    <div className="col s12 m6 offset-m3 center">
      <h3 className="font-100">Вход</h3>
      <p style={{color:'red'}}>{this.state.error && this.state.error.message}</p>
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate" onChange={ev => this.setState({ email: ev.target.value})}/>
          <label htmlFor="email">Почта</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate" onChange={ev => this.setState({ password: ev.target.value})}/>
          <label htmlFor="password">Пароль</label>
        </div>
      </div>
      <div className="row">
          <button className="waves-effect waves-light btn col s12"  onClick={() => {this.login()}}>Войти</button>
      </div>
      <div className="row">
          <button className="waves-effect waves-light btn col s12"  onClick={() => {this.register()}}>Зарегистрироваться</button>
      </div>
    </div>
  </div>;
  }
}

export default Auth;