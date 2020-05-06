
import React from "react";
import MainPage from "./components/Login/MainPage";
import { useAuth0 } from "./react-auth0-spa";
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from "components/Grid/GridContainer.js";
import SignupForm from 'components/Login/SignupForm'
import LoginForm from 'components/Login/LoginForm'
import Signup from 'components/Login/Signup'

import DraftEditor from 'components/MyComponents/DraftEditor'
import QuillEditor from 'components/MyComponents/QuillEditor'
import CardVideo from 'components/Card/CardVideo'
import Table from 'components/Tables/Table'
import Admin from "layouts/Admin";
import MyMap from 'components/Map/MyMap'
import Map from 'components/Map/Map'
import CoronaApp from './CoronaApp'
import AccessComponent from 'components/Login/AccessComponent'
import AgentForm from 'components/AgentForm/AgentForm'
import Editor from 'components/MyComponents/Editor'
import RecipeReviewCard from 'components/MyComponents/RecipeReviewCard'

import Dashboard from 'views/Dashboard/Dashboard'


class App extends React.Component {



 componentDidMount(){
  



}


 render(){



  return (
    <div className="App">
      
 {/* */} <Admin user="agent"/>



          
    </div>
  
  
  
  );
 }

}

export default App;