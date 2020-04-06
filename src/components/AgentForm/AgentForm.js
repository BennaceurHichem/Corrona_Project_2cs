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

import data_wilayas from "alger_data.json";
import wilayas from "./wilayas.json";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
      all_commune: allCommune,
      all_wilayas: allWilayas,
      choosedWilaya: "",
      choosedWilayaNumber: 0,
      wilayas_communes: [
        {
          wilaya: "invalid_wilaya",
          lat_wilaya: 0,
          lng_wilaya: 0,
          communes: [
            {
              nom_commune: "",
              lat: 0,
              lng: 0,
              nbrecovered: 0,
              nbDeath: 0,
              nbCase: 0,
              nbgueris: 0,
            },
          ],
        },
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

    console.log(this.state.wilayas_communes[0]["communes"]);
  }

  //get all commune of a specific wilayas
  findCommuneByWilayas(data, wilayas_num) {
    return data.filter((element) => {
      return element.wilaya_id == wilayas_num;
    });
  }
  handleChoixWilayas = (e, value, reason) => {
    /*
 commune :  arr.indexOf("bob") > -1 ? this.state.wilayas_communes[0]["communes"].push({
                                                        nom_commune: '',
                                                        lat: 0,
                                                        lng:0,
                                                        nbrecovered: 0,
                                                        nbDeath: 0,
                                                        nbCase: 0,
                                                        nbgueris: 0,})

    */

    console.log("event" + Object.keys(value));
    console.log("initial state: " + this.state.wilayas_communes.length);
    console.log("reason" + reason);

    this.setState((prevState) => ({
      choosedWilaya: value ? value.nom : "invalid",
      choosedWilayaNumber:value.code,
      wilayas_communes: prevState.wilayas_communes.concat({
        wilaya: value ? value.nom : "invalid",
        lat_wilaya: value.lat,
        lng_wilaya: value.lng,
        communes: {},
      }),
    }));

    console.log(
      "updated state: " + this.state.wilayas_communes.map((item) => item.wilaya)
    );
  };




  handleChoixCommune = (e, value, reason) => {

    console.log("commune onchange  e : "+e)
    console.log("commune onchange  value : "+value)
    console.log("commune onchange  reason : "+reason)




  }
  //get all commune of a specific wilayas
  getAllWilaya(data) {
    return data.filter((element) => {
      return element.wilaya_id;
    });
  }
  getOptionSelected = (e) => {
    console.log("the selected option" + e);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
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
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <Autocomplete
                      id="wilayas-select-demo"
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
                      required
                    />
                  </GridItem>{" "}
                  <GridItem xs={12} sm={12} md={4}></GridItem>{" "}
                </GridContainer>{" "}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>

                    <Autocomplete
                      multiple
                    
                      id="multiple-limit-tags"
                      options={this.state.all_commune.filter( (commune)=>this.state.choosedWilayaNumber===commune.wilaya_id)}
                      getOptionLabel={(option) => option.nom}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="limitTags"
                          placeholder="Favorites"
                          onChange={(e, value, reason) =>
                        this.handleChoixCommune(e, value, reason)
                      }
                        />
                      )}
                    />{" "}
                  </GridItem>{" "}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Last Name"
                      id="last-name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />{" "}
                  </GridItem>{" "}
                </GridContainer>{" "}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />{" "}
                  </GridItem>{" "}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Country"
                      id="country"
                      formControlProps={{
                        fullWidth: false,
                      }}
                    />{" "}
                  </GridItem>{" "}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Postal Code"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: false,
                      }}
                    />{" "}
                  </GridItem>{" "}
                </GridContainer>{" "}
                <GridContainer></GridContainer>{" "}
              </CardBody>{" "}
              <CardFooter>
                <Button color="primary"> Update Profile </Button>{" "}
              </CardFooter>{" "}
            </Card>{" "}
          </GridItem>{" "}
          <GridItem xs={12} sm={12} md={4}></GridItem>{" "}
        </GridContainer>{" "}
      </div>
    );
  }
}

export default withStyles(styles)(AgentForm);
