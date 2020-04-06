
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

import Dashboard from 'views/Dashboard/Dashboard'
import data_wilayas from 'alger_data.json';

class App extends React.Component {



 componentDidMount(){
  /*0:
  longitude: -0.1869644
  latitude: 27.9716342
  nom: "Adrar"
  id: "1"
  wilaya_id: "1"
  code_postal: "01001"
  */
  const allData = data_wilayas.map((item)=>item)
const wilayasSearch = this.findCommuneByWilayas(allData,16)
 const ids = data_wilayas.map( (item)=>item.id)
 const communeName =   data_wilayas.map( (item)=>item.nom)
 

console.log(this.getAllWilaya(allData))
 }


//get all commune of a specific wilayas 
  findCommuneByWilayas(data,wilayas_num ) {
  return data.filter((element) => {
    
    return element.wilaya_id ==    wilayas_num;
  })
}


//get all commune of a specific wilayas 
getAllWilaya(data) {
  return data.filter((element) => {
    
    return element.wilaya_id
  })
}
 render(){



  return (
    <div className="App">
      
  <AgentForm />
          
    </div>
  
  
  
  );
 }

}

export default App;