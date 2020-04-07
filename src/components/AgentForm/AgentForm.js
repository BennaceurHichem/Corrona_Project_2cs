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

import data_wilayas from "alger_data.json";
import wilayas from "./wilayas.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from 'lodash'   
import Table from 'components/Table/Table'
import MaterialTable from 'material-table';

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

class AgentForm extends React.Component {
  constructor(props) {
    super(props);
    //all commune by wilayas and each commune have nb persone touches
    /*
            one object created wilayas_commune
            {
                wilayas : nom_wilayas,
                lat_wilaya: 0,
                    lng_wilaya: 0,
                commune : {
                    {
                          nom_commune: nom,
                          nbrecovered: 0,
                          lat: x,
                          lng:y,
                          nbDeath: 0,
                          nbCase: 0,
                          nbgueris: 0,

                    },
                    {
                          nom_commune: nom,
                          lat: x,
                          lng:y,
                          nbrecovered: 0,
                          nbDeath: 0,
                          nbCase: 0,
                          nbgueris: 0,
                    },
                        .
                        .
                        .


                }
            }


            */

    // Don't call this.setState() here!
    const allCommune = data_wilayas.map((item) => item);
    const allWilayas = wilayas.map((item) => item);
    console.log(allWilayas);
    this.state = {
      data:[],
      all_commune: allCommune,
      all_wilayas: allWilayas,
      choosedWilaya: "",
      choosedWilayaNumber: 0,
      //this will be used when the user start picking their commune where he couldn't change the wilayas until he delete all communes
      is_wilayasdisabled: false,
      nbRecovered: 0,
      nbDeath: 0,
      nbCase: 0,
      nbGueris: 0,
      wilayas_communes: [
      
        
      ],
    };
  }

  componentDidMount() {
    /*0:
            longitude: -0.1869644
            latitude: 27.9716342
            nom: "Adrar"
            id: "1"
            wilaya_id: "1"
            code_postal: "01001"
            */

    const wilayasSearch = this.findCommuneByWilayas(
      this.state.wilayas_communes,
      16
    );
    const ids = data_wilayas.map((item) => item.id);
    const communeName = data_wilayas.map((item) => item.nom);

  }

  //get all commune of a specific wilayas
  findCommuneByWilayas(data, wilayas_num) {
    return data.filter((element) => {
      return element.wilaya_id == wilayas_num;
    });
  }
  handleChoixWilayas = (e, value, reason) => {

    /*console.log("event" + Object.keys(value));
    console.log("initial state: " + this.state.wilayas_communes.length);
    console.log("reason" + reason);
    console.log("this.state.wilayas_commune.wilaya = " + this.state.wilayas_communes);
    */
 


    this.setState((prevState) => ({
      choosedWilaya: value ? value.nom : "invalid",
      choosedWilayaNumber: value.code,
      //if not exist insert 
      wilayas_communes:  prevState.wilayas_communes.concat(value) ,
    }));

   
  };

  handleChoixCommune = (e, value, reason) => {
    console.log("commune onchange  e : " + e);
    console.log("commune onchange  value : " + value);
    console.log("commune onchange  reason : " + reason);
  if(value !== null){

    console.log("when the value is different to null ")
      this.setState((prevState)=>(
          
        {
          ...prevState,
          is_wilayasdisabled:true,
          wilayas_communes:{
                ...prevState.wilayas_communes,
                
                 
                  communes: value,
                
          }
          
              
          

      }))

  }

  if(reason==="clear"){
      this.setState({
          is_wilayasdisabled:false
      })
  }


  };
  //get all commune of a specific wilayas
  getAllWilaya(data) {
    return data.filter((element) => {
      return element.wilaya_id;
    });
  }
 


//handle all numbers chage and store them in the state 
handleNbCases = (e)=>{

    console.log("value cases"+e.target.value)
    const num = e.target.value;
        this.setState((prevState)=>({
          nbCase:num,

           
        }))

}
handleNbRecovered = (e)=>{


    console.log("value Recovered"+e.target.value)
    const num = e.target.value;
    this.setState({

        nbRecovered:num,
    })

    
}
handleNbGueris = (e)=>{

    console.log("value Gueris"+e.target.value)
    const num = e.target.value;
    this.setState({

        nbGueris:num,
    })
    
}

handleNbDeaths= (e)=>{

    console.log("value death"+e.target.value)
    const num = e.target.value;
    this.setState({

        nbDeath:num,
    })
}



addWilayaToData = (e)=>{

  const data = this.state.data
  console.log("event "+e.target.value)
 


/*  data[data.length-1] ={
    wilaya: value
  } 
    this.setState((prevState)=>({
      data: data
    
    }))*/
    


}

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  {" "}
                  Remplissage de donnés{" "}
                </h4>{" "}
                <p className={classes.cardCategoryWhite}>
                  {" "}
                  Agent de santè{" "}
                </p>{" "}
              </CardHeader>{" "}
              <CardBody>
             <Grid justifyContent="center" alignItems="center">
                  <GridItem xs={12} sm={12} md={8} marginTop="100px" marginBottom="100px">
                
                    <Autocomplete
                      id="wilayas-field"
                      disabled={this.state.is_wilayasdisabled ? true: false}
                      style={{
                        width: 300,
                      }}
                      options={this.state.all_wilayas}
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      getOptionLabel={(option) => option.nom}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span> {option.code} </span>({option.nom}){" "}
                        </React.Fragment>
                      )}
                      disableClearable="true"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose wilayas"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                      onChange={(e, value, reason) =>
                        this.handleChoixWilayas(e, value, reason)
                      }
                      type="number"
                      required
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    {" "}
                    <Autocomplete
                    onChange={(e, value, reason) =>
                            this.handleChoixCommune(e, value, reason)
                          }
                      multiple
                      id="commune-field"
                      options={this.state.all_commune.filter(
                        (commune) =>
                          this.state.choosedWilayaNumber === commune.wilaya_id
                      )}
                      getOptionLabel={(option) => option.nom}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Commune touchèes"
                          placeholder="Communes"
                          type="number"
                          
                        />

                      )}
                    />{" "}
                  </GridItem>{" "}
                </Grid>{" "}
                <Grid>
                  <GridItem xs={12} sm={12} md={8}></GridItem>{" "}
                  <Grid>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                      required
                      type="number"
                      label="Cases number"
                      id="nbCases"
                        onChange={(e)=>this.handleNbCases(e)}
                        type="number"
                      margin="dense"
                      />{" "}
                    </GridItem>{" "}
                  </Grid>
                </Grid>{" "}
                <Grid>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                    required
                    type="number"
                    onChange={(e)=>this.handleNbRecovered(e)}

                    label="Recovered persons"
                    type="number"
                      id="nbRecovered"
                      formControlProps={{
                        fullWidth: false,
                      }}
                    />{" "}
                  </GridItem>{" "}
                </Grid>
                <Grid>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                    onChange={(e)=>this.handleNbGueris(e)}
                    required
                    type="number"
                    label="Gueris person number"
                      id="nbGueris"
                      formControlProps={{
                        fullWidth: false,
                      }}
                    />{" "}
                  </GridItem>{" "}
                </Grid>
                <Grid>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                        required
                        type="number"
                        label="Death number"
                      onChange={(e)=>this.handleNbDeaths(e)}

                      id="nbDeath"
                      formControlProps={{
                        fullWidth: false,
                      }}
                    />{" "}
                  </GridItem>{" "}
                </Grid>
                <GridContainer> </GridContainer>{" "}

                            </CardBody>{" "}
              <CardFooter>
                <Button color="primary" type="submit"> Update Profile </Button>{" "}
              </CardFooter>{" "}
            </Card>{" "}
          </GridItem>{" "}
          <GridItem xs={12} sm={12} md={4}>
            {" "}
          </GridItem>{" "}
        </Grid>{" "}


        <MaterialTable
        title="Wilayas data remplis "
        columns={[
        { title: 'Wilayas', field: 'choosedWilaya' ,
        editComponent: props => (
          <Autocomplete
          
                      id="wilayas-field"
                      style={{
                        width: 100,
                      }}
                      
                      options={this.state.all_wilayas}
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      getOptionLabel={(option) => option.nom}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span> {option.code} </span>({option.nom}){" "}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose wilayas"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                      onChange={
                        (e,value,reason) => {
                                  console.log("value in wilayas:"+Object.keys(value))
                                  var data = { ...props.rowData };
                                  data.wilaya = value;
                                  data.choosedWilaya = value.nom
                                  data.wilaya_id = value.id ? value.id : -1
                                  props.onRowDataChange(data);
                             }
                      }
                      value={this.state.data.choosedWilaya || ""}
                      type="number"
                      required
                    />


        )
           
          
        },
        { title: 'Commune', field: 'nom_commune' ,
        editComponent: props => (
          <Autocomplete
          
                      id="wilayas-field"
                      style={{
                        width: 100,
                      }}
                      
                      options={this.findCommuneByWilayas(this.state.all_commune,props.rowData.wilaya_id)}
                      classes={{
                        option: classes.option,
                      }}
                      autoHighlight
                      getOptionLabel={(option) => option.nom}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span> {option.code} </span>({option.nom}){" "}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Choose commune"
                          variant="outlined"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password", // disable autocomplete and autofill
                          }}
                        />
                      )}
                      onChange={
                        (e,value,reason) => {
                          console.log("value in commune:"+Object.keys(value))

                                  console.log(" wilaya_id :   "+props.rowData.wilaya_id)
                                  var data = { ...props.rowData };
                                  data.commune = value;
                                  data.nom_commune = value.nom
                                  props.onRowDataChange(data);
                             }
                      }
                      value={this.state.data.nom_commune || ""}
                      type="number"
                      required
                    />


        )
           
          
        },
        { title: 'Cases Number', field: 'nbCase', type: 'numeric' },
        { title: 'Recovered Number', field: 'nbRecovered', type: 'numeric' },
        { title: 'Gueris Number', field: 'nbGueris', type: 'numeric' },
        { title: 'Death Number', field: 'nbDeath', type: 'numeric' },
      
      ]}
        data={this.state.data}

      editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
     
      </div>
    );
  }
}

export default withStyles(styles)(AgentForm);
