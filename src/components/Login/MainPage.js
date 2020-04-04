import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import Dashboard from "views/Dashboard/Dashboard";
import { Router, Route, Switch, Redirect,Link } from "react-router-dom";
import {browserHistory} from 'react-router';

import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import Favorite from "@material-ui/icons/Favorite";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import cardImagesStyles from "assets/jss/material-dashboard-react/cardImagesStyles.js";
import corona_back from "assets/img/corona_back.jpg";
import "components/Login/nav.css";

import coronaWatchLogo from 'components/Login/coronaWatchLogo.png'

import Form from 'components/Login/form'
import AccessComponent from './AccessComponent'

import history from '../../history'

const styles = {
  ...cardImagesStyles,
  textWhite: {
    "&, & *": {
      color: "#FFF"
    }
  }
};


class  MainPage extends React.Component  {
 // const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
 handleClick(){

  console.log("clicked ! ")
  history.push("/login");
}

 
  render(){

    return (
    
      <div>
        
          <div>
            <GridContainer
              container
              spacing={0}
              align="center"
              justify="center"
              direction="column"
            >
              <div id="container"  style={{ justifyContent: "center" ,marginLeft:"30%",marginBottom:'80px'}}>
            
              <Button
                onClick={this.handleClick.bind(this)}
                color="primary"
                round
              >
              
   
                <Favorite />
                التسجيل في الموقع
              </Button>
                <div id="flip">
                  <div>
                    <div>كورونا ووتش </div>
                  </div>
                  <div>
                     <div>CoronaWatch</div>
                  </div>
  
                  <div>
                       <div>مرحبا بكم في </div>
                  </div>
                </div>
             
           
               
              </div>
             
             
          
           
          <div>
  
  
          </div>
            
            </GridContainer>
  
            <div>
              <iframe
                scrolling="no"
                frameBorder="0"
                allowfullscreen=""
                style={{ border: "none", width: "600px", height: "500px",marginRight:"50%" }}
                src="https://e.infogram.com/8871bbdc-b9d7-45bd-a759-50f96ac3e073?parent_url=https%3A%2F%2Fwww.aljazeera.com%2Fnews%2F2020%2F01%2Fcountries-confirmed-cases-coronavirus-200125070959786.html&amp;src=embed#async_embed"
                title="مناطق  انتشار كورونا حول العالم"
              ></iframe>
            </div>
          </div>
  
  
      
      </div>
    );



  }
  
};

export default MainPage;
