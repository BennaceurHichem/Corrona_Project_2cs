import React, { useState,useEffect } from 'react';import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import ReactPlayer from "react-player";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import defaultImage from 'assets/img/not_found.png'
import LoadingBar from 'react-top-loading-bar';
import ReactHtmlParser from 'react-html-parser'
import { withStyles } from '@material-ui/core/styles';
import PaginationList from 'react-pagination-list';
import YouTube from 'react-youtube';

import API from '../../api'

//<CardVideo title="corona article" description="Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Most people who become infected experience mild illness and recover, but it can be more severe for others. Take care of your health and protect others by doing the following:" maxWidth="400px"/>

const styles = {
  btn: {
    marginRight:"30px"
  },
};



/*
      <YouTube
        videoId={url?url:"https://www.youtube.com/watch?v=DQzYnxN3tE4"}                  // defaults -> null
        id={videoId}                       // defaults -> null
      
/>

*/
 export default function ScrappedVideoCard(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 400,
      marginTop:20,
      marginBottom:20,
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    btn:{
      marginRight:"10px"
    }
  }));

  const [expanded, setExpanded] = React.useState(false);
  const [showButtons, setShowButtons] = React.useState(true)
  const [isValider, setisValider] = React.useState(true)



  /*useEffect(() => {
    setisValider(props.isValidated);
  }, [props.isValidated]);
*/

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  //this is the passed props from the parent which xontaine all data needed for an article 
  const { title, description, url,date,id ,isValidated, channel,videoId} = props;




 const handleValidation = (e)=>{
  
  const updateVideo = `scrapers/youtube/validate/${id}`
  const data ={
    id:props.id,
    is_validated:true,
  }

 API.put(updateVideo,
     
   data
 ,{
 headers:{
 
   'Accept': 'application/json',
   'Content-Type': 'application/json',
 }
}).then(res=>{
  setShowButtons(false)
  alert("تم قبول الفيديو بنجاح ! ")

}).catch(err=>{
alert("خلل في تأكيد الفيديو ! "+err)

})
    
  }
  const handleInValidation = (e)=>{
  
    const updateVideo = `scrapers/youtube/validate/${id}`
    const data ={
      id:props.id,
      is_validated:false,
    }
  
   API.put(updateVideo,
       
     data
   ,{
   headers:{
   
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   }
  }).then(res=>{
    setShowButtons(false)
    alert("تم رفض الفيديو بنجاح ! ")
  
  }).catch(err=>{
  alert("خلل في تأكيد الفيديو ! "+err)
  
  })
      
    }
   
  return (

  
      <>

          
    <Card className={classes.root}>
      <CardActionArea>
      <ReactPlayer
          width="100%"
          height="300px"
          url={
            url
              ? url
              : "https://www.youtube.com/watch?v=ysz5S6PUM-U"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {title
              ? ReactHtmlParser(title)
              : "العنوان"}
          </Typography>
          <Typography variant="h6"
            color="textSecondary"
            component="h6"
            style={{ position: "inherit" }}>{date? new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(date)):"تاريخ الكتابة غير متوفر "}</Typography>
             <Typography variant="h6"
            color="textSecondary"
            component="h6"
            style={{ position: "inherit" }}>{(!isValidated && showButtons )?"حالة الفيديو لم يتم قبوله بعد  ":"حالة الفيديو :تم قبوله "}</Typography>
       
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Box justify-content="center" margin="auto">
          {showButtons &&
              <>
            {!isValidated &&  
            <>
              <Button className={classes.btn} onClick={e=>handleValidation(e)} size="small">
                <CheckIcon style={{ color: green[500],margin:"30px" }}></CheckIcon>
                قبول الفيديو
              </Button>
       
                </>
            }
            {isValidated && 
            <>
              <Button className={classes.btn} onClick={e=>handleInValidation(e)} size="small">
              <CloseIcon style={{ color: red[500] }}></CloseIcon>
                رفض الفيديو
              </Button>
       
                </>
            }
        
            </>

          }
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ position: "inherit" }}
          >
            {props.description
              ? 
              ReactHtmlParser(props.description)
              : " وصف الفيديو "}
          </Typography>
         
          </CardContent>
        </Collapse>
     
    </Card>
  
</>
  );
}





