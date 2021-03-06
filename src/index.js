/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Agent from "layouts/Agent.js";
import Redacteur from "layouts/Redacteur.js";

import Dashboard from "views/Dashboard/Dashboard";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import { Auth0Provider } from "./react-auth0-spa";
import config from "./auth_config.json";

import App from "./App";
import CoronaApp from "./CoronaApp";
import history from './history'
import AccessComponent from 'components/Login/AccessComponent'

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
 
  <Router history={history}>
   
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/agent" component={Agent} />
      <Route path="/redacteur" component={Redacteur} />
      <Route path="/rtl" component={RTL} />
      

    </Switch>
    <Route exact path="/login" component={AccessComponent} />
    <Route exact path="/" component={App} />
  </Router>
  
  ,
  document.getElementById("root")
);

{
  /* 

 <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>



*/
  /*

  <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >



       </Auth0Provider>

*/
}
