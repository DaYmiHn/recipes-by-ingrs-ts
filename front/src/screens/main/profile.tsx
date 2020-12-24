import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import store from '../../store/'
interface IProps {
    profile: {
      image: string
    }
  
}
interface IState {
  email: string | null,
  password: string | null,
}

export default function Profile(props:any) {
  let match = useRouteMatch();
  const {recipes, user}:any = store.getState();
  console.log(recipes)
  user.email = '34234'
  return (
    <div>
      <h2>{user.email}</h2>
      <h2>{props.profile.image}</h2>
      <img src={props.profile.image} />
      <h2>Заголовок</h2>
      <ul>
        <li>
          <Link to={`${match.url}/Эээээ`}>Эээээ</Link>
        </li>
        <li>
          <Link to={`${match.url}/dasdas`}>
            sdfsdf
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>dfsdf</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId }:any = useParams();
  return <h3>Нуууууууу: {topicId}</h3>;
}
