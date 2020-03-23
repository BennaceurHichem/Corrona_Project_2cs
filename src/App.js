import React from "react";
import MainPage from "./components/Login/MainPage";
import { useAuth0 } from "./react-auth0-spa";
import CircularProgress from '@material-ui/core/CircularProgress';
import GridContainer from "components/Grid/GridContainer.js";
import SignupForm from 'components/Login/SignupForm'
import LoginForm from 'components/Login/LoginForm'


function App() {
//  const { loading } = useAuth0();


  return (
    <div>
     

      <SignupForm />
 
     

    </div>
  );
}

export default App;