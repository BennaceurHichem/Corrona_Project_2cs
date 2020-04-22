
import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    accbutt: {
        backgroundColor: '#00acc1',
        '&:hover': {
            backgroundColor: '#00acc1',
        },

    },
}));






class  RecipeReviewCard extends React.Component {
    constructor(props) {
        super(props);
       
    this.state={

        article :""



    }
      }




 handleChange = (e) => {

            console.log(this.state.article)
            console.log(e); //Get Content Inside Editor
            this.setState({
                
                    article: e

            })
                
               
            console.log("after " + this.state.article)

        }

 

render(){
    const { classes } = this.props;

    return (
        <div>
            <SunEditor onChange={this.handleChange} setOptions={{
                height: 500,
                "buttonList": [

                    ["undo",
                        "redo",
                        "font",
                        "fontSize",
                        "formatBlock"],
                    ["bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript"],
                    ["fontColor",
                        "hiliteColor"],
                    ["removeFormat",
                        "outdent",
                        "indent"],
                    ["align",
                        "horizontalRule",
                        "list",
                        "lineHeight"],
                    ["table",
                        "link"],
                    ["image",
                        "video"],
                   

                ],
            }} />

            <form>


            <Button type="submit" variant="contained" color="primary" className={classes.accbutt}>
                Postuler
            </Button>

            </form>
        </div>

    );

}

  

}



export default  withStyles(useStyles)(RecipeReviewCard);