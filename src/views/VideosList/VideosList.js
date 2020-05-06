import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import CardVideo from 'components/Card/CardVideo.js'
import CardMedia from '@material-ui/core/CardMedia';
import { isConstructorDeclaration } from "typescript";


export default class  VideosList extends React.Component{

  constructor(props){
    super(props)



  }
  render(){
  
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <CardVideo  id={this.props.id} title={this.props.title? this.props.title:"مقال حول كورونا "} content={this.props.content?this.props.content:"مضمون مقال كورونا "} image={this.props.image?this.props.image:"https://corona-watch-api.herokuapp.com/uploads/62422326_1424531601033075_6778511987220414464_o.jpg"} date={this.props.date?this.props.date.toString():"12-12-20"} />
  
        </GridItem>
      </GridContainer>
    );


  }
 
}
