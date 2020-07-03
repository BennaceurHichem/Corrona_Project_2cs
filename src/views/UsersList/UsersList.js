import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import avatar from "assets/img/faces/marc.jpg";
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import { Box } from '@material-ui/core'

import wilayas from "../../wilayas_api.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from 'lodash'   
import Table from 'components/Table/Table'
import MaterialTable from 'material-table';
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar';

import SignupForm  from "components/Login/SignupForm.js";


//API call 
import API from '../../api';
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

class UsersList extends React.Component {
  constructor(props) {
    super(props);
   

  
 
    this.state = {
      data:[],
  
        
        
      
    
    };
  }



  /*
Api calls are made here with their treatement 

*/
  componentDidMount() {

   
const usersUrl = 'users/'    
    this.LoadingBar.continuousStart()

    API.get(usersUrl,
        {
        headers:{
                      'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        }
      }).then((res)=>{
         this.LoadingBar.complete()
          
          this.setState({
              data :res.data,
              success:true
          })
          
      }).catch((err)=>{
        alert(err)
      })

    
        


    
        



  }

  addUser(id,patchData){
    const townsUrl = `/geolocation/towns/${id}`
    return API.patch(townsUrl,
      
        patchData
      ,{
      headers:{
      
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      }
    })

  }




  render() {
    const { classes } = this.props;
    return (
      <div>
        <LoadingBar
          height={3}
          color='#f11946'
          onRef={ref => (this.LoadingBar = ref)}
        />

      <Box display="flex" justifyContent="center" m={4} p={1}>
      <Box p={1} >

      <Typography component="h1" variant="h4" color="black"  gutterBottom="true">
                  Liste de touts les utilisateurs
            </Typography>
            

      <MaterialTable
        title="Listes des differents Admins de plateforme"
        columns={[
         
        { title: 'Username', field: 'username',},
        { title: 'role', field: 'role' ,
        editComponent: props => (
          <Autocomplete
          
                      id="role"
                      style={{
                        width: 100,
                      }}
                      disableClearable
                      options={["moderator",""]}
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      getOptionLabel={(option) => option}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span> {option} </span>
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose role"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                      onChange={
                        (e,value,reason) => {
                                  var data = { ...props.rowData };
                                
                                  data.username = value.name
                                  data.role = value.role 

                                  props.onRowDataChange(data);
                             }
                      }
                      value={props.rowData.role || ""}
                      type="text"
                      required
                    />


        )
           
          
        },
      
      ]}
        data={this.state.data}

     
      />



      </Box>
      </Box>
      <Box>
      <SignupForm  title="Ajouter un utilisateur "/>

      </Box>
      </div>
    );
  }
}

export default withStyles(styles)(UsersList);
