import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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




//<CardVideo title="corona article" description="Stay aware of the latest information on the COVID-19 outbreak, available on the WHO website and through your national and local public health authority. Most people who become infected experience mild illness and recover, but it can be more severe for others. Take care of your health and protect others by doing the following:" maxWidth="400px"/>

export default function CardVideo(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: props.maxWidth ? props.maxWidth : "400",
      margin: "auto"
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
    }
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  const { title, description, url } = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <ReactPlayer
          width="100%"
          height="200px"
          url={
            props.url
              ? props.url
              : "https://www.youtube.com/watch?v=ysz5S6PUM-U"
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4">
            {props.title
              ? props.title
              : "This is a default title  of this videos "}
          </Typography>
       
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Box justify-content="center" margin="auto">
          <Button size="small">
            <CheckIcon style={{ color: green[500] }}></CheckIcon>
            Accept
          </Button>
          <Button size="small">
            <CloseIcon style={{ color: red[500] }}></CloseIcon>
            Refuse
          </Button>

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
            <Typography variant="body2"
            color="textSecondary"
            component="h4"
            style={{ position: "inherit" }}>Article content:</Typography>
              <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ position: "inherit" }}
          >
            {props.description
              ? props.description
              : "This is a default Text description of this videos "}
          </Typography>
         
          </CardContent>
        </Collapse>
     
    </Card>
  );
}
