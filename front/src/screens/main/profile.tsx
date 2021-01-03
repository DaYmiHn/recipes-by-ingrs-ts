import React, { Component, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {connect} from 'react-redux';

interface IProps {
  profile: {
    image: string
  },
  user: any
}
interface IState {
  email: string | null,
  password: string | null,
}

export function Profile(props:any) {
  let match = useRouteMatch();
  const {user}:any = props;
  console.log(user)
  return (
    <div>
      <div id="profile-page-header" className="card">
          <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src="https://cdni.rt.com/russian/images/2017.04/article/58fe599bc3618843468b47c1.jpg" alt="user background" style={{ height: "247px"}}/>                    
          </div>
          <div className="card-content">
            <div className="row">                    
              <div className="col s3 left-align">                        
                <figure className="card-profile-image" style={{width: "130px",height: "130px", zIndex: 1,  cursor: "pointer", margin: 0}} >
                    <img src={user.image} alt="profile image" className="circle z-depth-2 responsive-img activator"/>
                </figure>              
              </div>
              <div className="col s2 center-align">                        
                  <h4 className="card-title grey-text text-darken-4">{user.email}</h4>
                  <p className="medium-small grey-text">{user.role}</p>                        
              </div>
              <div className="col s2 center-align">
                  <h4 className="card-title grey-text text-darken-4">2+</h4>
                  <p className="medium-small grey-text">Work Experience</p>                        
              </div>
              <div className="col s2 center-align">
                  <h4 className="card-title grey-text text-darken-4">6</h4>
                  <p className="medium-small grey-text">Completed Projects</p>                        
              </div>                    
              <div className="col s2 center-align">
                  <h4 className="card-title grey-text text-darken-4">1,253,000$</h4>
                  <p className="medium-small grey-text">Busness Profit</p>                        
              </div>                    
              <div className="col s2 right-align">
                <a className="btn-floating activator waves-effect waves-light darken-2 right">
                    <i className="mdi-action-perm-identity"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="card-reveal">
              <p>
                <span className="card-title grey-text text-darken-4">Roger Waters <i className="mdi-navigation-close right"></i></span>
                <span><i className="mdi-action-perm-identity cyan-text text-darken-2"></i> Project Manager</span>
              </p>

              <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
              
              <p><i className="mdi-action-perm-phone-msg cyan-text text-darken-2"></i> +1 (612) 222 8989</p>
              <p><i className="mdi-communication-email cyan-text text-darken-2"></i> mail@domain.com</p>
              <p><i className="mdi-social-cake cyan-text text-darken-2"></i> 18th June 1990</p>
              <p><i className="mdi-device-airplanemode-on cyan-text text-darken-2"></i> BAR - AUS</p>
          </div>
      </div>
      <h2>Заголовок</h2>
      <ul>
        <li>
          <Link to={`${match.url}/settings`}>
            1
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/data`}>
            2
          </Link>
        </li>
      </ul>

      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Начальная страница</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId }:any = useParams();
  return <h3>Страница: {topicId}</h3>;
}


const mapStateToProps = (state:any) => {
  return {
    tasks: state.tasks,
    filters: state.filters,
    user: state.user,
  }
}
export default connect((mapStateToProps), { })(Profile);