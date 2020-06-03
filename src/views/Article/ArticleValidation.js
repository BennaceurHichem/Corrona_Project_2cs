
import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

//Editor Component
import Editor from "components/MyComponents/Editor";
import VideosList from 'views/VideosList/VideosList'

import API from '../../api'
import LoadingBar from 'react-top-loading-bar';



export default class ArticleValidation extends React.Component
{

    constructor(props){
        super(props)
        this.state = {
            articles:[],
            success:false


        }


    }


   

componentDidMount(){

    const articlesURL ='feeds/articles' 
   this.LoadingBar.continuousStart()
    

    API.get(articlesURL,
      {
      headers:{
        Authorization:'Basic YWRtaW46YWRtaW4=',
      
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      }
    }).then((res)=>{
       this.LoadingBar.complete()
        
        this.setState({
            articles:res.data,
            success:true
        })
        
          console.log("files:"+this.state.articles.map(item=> item.attachment.file))
    
    }).catch((err)=>{


      alert(err)
    })



}



                    render(){
                        

                    return(
                        <Grid>

                                    <LoadingBar
                                    height={3}
                                    color='#f11946'
                                    onRef={ref => (this.LoadingBar = ref)}
                                />
                        {this.state.success &&
                            this.state.articles.filter(item=>!item.is_deleted).sort((a, b)=> new Date(b.publication_date)-new Date(a.publication_date) ).map((item)=>
                                 <VideosList 
                                  id={item.id} 
                                  title={item.title}
                                   content={item.content} 
                                 image={item.attachment.file_url} 
                                 date={item.publication_date} 
                                 isValidated={item.is_validated? true:false} 
                                 isDeleted={item.is_deleted? true:false}/>
                            
                            
                            )


                        }
                                 
                                  {/* <VideosList  title={"عنوان"} content={"مضمون"} image={"https://corona-watch-api.herokuapp.com/uploads/62422326_1424531601033075_6778511987220414464_o.jpg"} date={"12-12-12"}/>   */} 
                           </Grid>

                        

                               
                                
    





                    );




                    }



}


























