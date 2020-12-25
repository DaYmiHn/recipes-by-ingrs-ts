import React, { Component } from 'react';
import Profile from './profile';
import Ingredients from './ingredients';
import Recipes from './recipes';
import News from './news';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




interface IProps {
  profile: object|null
}

interface IState {
  email: string | null,
  password: string | null,
}

declare const window: any;

export default class Main extends Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);
    this.state = {
      email: '',
      password:''
    }
  }
  
  render() {
    return <Router>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">   Domchanski</Link>
          <a href="" data-target="mobile-demo" className="sidenav-trigger" onClick={() => window.M.Sidenav.init(document.querySelectorAll('.sidenav'))}><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><Link to="/news" title="Новости" ><i className="material-icons">article</i></Link></li>
            <li><Link to="/search" title="Поиск по сайту" ><i className="material-icons">search</i></Link></li>
            <li><Link to="/recipes" title="Рецептики" ><i className="material-icons">restaurant_menu</i></Link></li>
            <li><Link to="/my_ingredients" title="Мои продукты" ><i className="material-icons">kitchen</i></Link></li>
            <li><Link to="/profile" title="Мой профиль" ><i className="material-icons">person</i></Link></li>
            <li><a title="Выйти из профиля" onClick={() => window.confirm("Точно хотите выйти?") && !window.localStorage.setItem('userToken', '') && window.location.reload()}><i className="material-icons">clear</i></a></li>
            <li><Link to="/about" title="ещё всякое..."><i className="material-icons">more_vert</i></Link></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/news" title="Новости" ><i className="material-icons">article</i>   Новости    </Link></li>
        <li><Link to="/about" title="Поиск по сайту" ><i className="material-icons">search</i>   Поиск по сайту    </Link></li>
        <li><Link to="/recipes" title="Рецептики" ><i className="material-icons">restaurant_menu</i>    Рецептики   </Link></li>
        <li><Link to="/my_ingredients" title="Мои продукты" ><i className="material-icons">kitchen</i>     Мои продукты     </Link></li>
        <li><Link to="/profile" title="Мой профиль" ><i className="material-icons">person</i>      Мой профиль      </Link></li>
        <li><a title="Выйти из профиля" onClick={() => window.confirm("Точно хотите выйти?") && !window.localStorage.setItem('userToken', '') && window.location.reload(false)}><i className="material-icons">clear</i>     Выйти из профиля    </a></li>
        <li><Link to="/search" title="ещё всякое..."><i className="material-icons">more_vert</i>    ещё всякое...    </Link></li>
      </ul>  
      
      <Switch>
        <Route exact={true} path="/">
          <h2>Главная</h2>
        </Route>
        <Route path="/news">
          <News/>
        </Route>
        <Route path="/about">
          <h2>about</h2>
        </Route>
        <Route path="/recipes">
          <Recipes profile={this.props.profile} />
        </Route>
        <Route path="/my_ingredients">
          <Ingredients profile={this.props.profile} />
        </Route>
        <Route path="/profile">
          <Profile profile={this.props.profile}/>
        </Route>
        <Route path="/search">
          <h2>search</h2>
        </Route>
      </Switch>
    </Router>
    ;
  }
}
