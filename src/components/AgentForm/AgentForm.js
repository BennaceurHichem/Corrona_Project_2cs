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
import data_communes from "./communes_api.json";
import wilayas from "./wilayas_api.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from 'lodash'   
import Table from 'components/Table/Table'
import MaterialTable from 'material-table';
import Typography from "@material-ui/core/Typography";
import axios from 'axios'

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
   

    // Don't call this.setState() here!
    const allCommune = data_communes.map((item) => item);
 
    this.state = {
      data:[],
      all_commune: [],
      all_wilayas: [],
      choosedWilaya: "",
      commune_api:[],
      choosedWilayaNumber: 0,
     
      //this will be used when the user start picking their commune where he couldn't change the wilayas until he delete all communes
      is_wilayasdisabled: false,
      number_recovered: 0,
      number_death: 0,
      number_confirmed_case: 0,
      number_sick: 0,
      "number_carrier": 0,
      "number_suspect": 0,
        
        
      
    
    };
  }

  getCommunes()
{

  const townsUrl = 'https://cors-anywhere.herokuapp.com/https://corona-watch-api.herokuapp.com/corona-watch-api/v1/geolocation/towns/'
  return axios.get(townsUrl,{
    headers:{
      Authorization:'Basic YWRtaW46YWRtaW4=',
    
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    }
  })
 

}


getWilayas(){


  const token = "YWRtaW46YWRtaW4="
  //const headers = { 'Authorization':+' Basic YWRtaW46YWRtaW4=' };
  const url = 'https://cors-anywhere.herokuapp.com/https://corona-watch-api.herokuapp.com/corona-watch-api/v1/geolocation/states/'
  return axios.get(url,{
    headers:{
      Authorization:'Basic YWRtaW46YWRtaW4=',
    
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    }
  })
 

}
  componentDidMount() {

    axios.defaults.headers.common['Authorization'] = 'Basic YWRtaW46YWRtaW4=';

    Promise.all([this.getWilayas(), this.getCommunes()])
    .then(([all_wilayas, all_commune])  => {
      const dataWilayas = all_wilayas.data;
      const dataCommunes =all_commune.data;
        this.setState({
          all_wilayas: dataWilayas,
          all_commune:dataCommunes,
        });
    });
    
    
        


    
        



  }

  //get all commune of a specific wilayas
  findCommuneByWilayas(communes, wilaya_num) {
    console.log("wilaays num "+ wilaya_num)
    return communes.filter((element) => {
      return element.state == wilaya_num;
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
 

  patchCommune(id,patchData){
    const townsUrl = `https://cors-anywhere.herokuapp.com/https://corona-watch-api.herokuapp.com/corona-watch-api/v1/geolocation/towns/${id}`
    return axios.patch(townsUrl,
      
        patchData
      ,{
      headers:{
        Authorization:'Basic YWRtaW46YWRtaW4=',
      
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      }
    })

  }


//handle all numbers chage and store them in the state 
handleNbConfirmedCase = (e)=>{

    console.log("value cases"+e.target.value)
    const num = e.target.value;
        this.setState((prevState)=>({
          number_confirmed_case:num,

           
        }))

}
handleNbRecovered = (e)=>{


    console.log("value Recovered"+e.target.value)
    const num = e.target.value;
    this.setState({

        number_recovered:num,
    })

    
}
handleNbSick = (e)=>{

    console.log("value Gueris"+e.target.value)
    const num = e.target.value;
    this.setState({

        number_sick:num,
    })
    
}

handleNbDeath= (e)=>{

    console.log("value death"+e.target.value)
    const num = e.target.value;
    this.setState({

        number_death:num,
    })
}

handleNbSuspect= (e)=>{

  console.log("value death"+e.target.value)
  const num = e.target.value;
  this.setState({

      number_suspect:num,
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
      
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
      <Box p={1} >

      <Typography component="h1" variant="h5">
              Remplissage des Informations des wilayas et communes affectè 
            </Typography>

      <MaterialTable
        title="Wilayas data remplis "
        columns={[
        { title: 'Wilayas', field: 'nom_wilaya' ,
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
                      getOptionLabel={(option) => typeof option==="string" ?option: option.name}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span> {option.code} </span>({option.name}){" "}
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
                                  console.log("value in wilayas:"+value ? Object.keys(value):"nothing")
                                  var data = { ...props.rowData };
                                
                                  data.nom_wilaya = value.name
                                  data.wilaya_id = value.id ? value.id : -1

                                  props.onRowDataChange(data);
                             }
                      }
                      value={props.rowData.nom_wilaya || ""}
                      type="number"
                      required
                    />


        )
           
          
        },
        { title: 'Commune', field: 'nom_commune' ,
        editComponent: props => (
          <Autocomplete
          
                      id="commune-field"
                      style={{
                        width: 100,
                      }}
                      
                      options={this.findCommuneByWilayas(this.state.all_commune,props.rowData.wilaya_id)}
                      classes={{
                        option: classes.option,
                      }}
                     
                      getOptionLabel={(option) => option ?option.name:"No option"}
                      renderOption={(option) => (
                        <React.Fragment>
                          <span> {option.code} </span>({option.name}){" "}
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
                          console.log("value in commune:"+value ?Object.keys(value):null)
                            console.log("row data : "+ Object.keys(props.rowData))


                                 //when data changed push this data 
                                  var data = { ...props.rowData };
                                 
                                  data.nom_commune = value.name
                                  data.id_commune = value.id

                                  console.log("all data row :"+Object.keys(data))
                                  props.onRowDataChange(data);
                             }
                      }
                      value={props.rowData.nom_commune || ""}
                      type="number"
                      required
                    />


        )
           
          
        },
        { title: 'Cases Number', field: 'number_confirmed_case', type: 'numeric' },
        { title: 'Recovered Number', field: 'number_recovered', type: 'numeric' },
        { title: 'Sick Number', field: 'number_sick', type: 'numeric' },
        { title: 'Death Number', field: 'number_death', type: 'numeric' },
        { title: 'Suspect Number', field: 'number_suspect', type: 'numeric' }
      
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


                    const id  = newData.id_commune
                    const number_death = newData.number_death
                    const number_suspect = newData.number_suspect
                    const number_confirmed_cases = newData.number_confirmed_case
                    const number_recovered= newData.number_recovered
                    const number_sick = newData.number_sick
                    const keys = {
                      number_death,
                      number_suspect,
                      number_confirmed_cases,
                      number_recovered,
                      number_sick
                    }
                    this.patchCommune(id,keys)


                }
                resolve()
              }, 3000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log("newData: "+ Object.keys(newData) )
              setTimeout(() => {
                {

                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                 
                  this.setState({ data }, () => resolve());
                  const id  = newData.id_commune

                  const number_death = newData.number_death
                  const number_suspect = newData.number_suspect
                  const number_confirmed_cases = newData.number_confirmed_case
                  const number_recovered= newData.number_recovered
                  const number_sick = newData.number_sick

                  const keys = {
                    number_death,
                    number_suspect,
                    number_confirmed_cases,
                    number_recovered,
                    number_sick
                  }
                  this.patchCommune(id,keys)

                    //this.patchCommune()

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

                  const id  = oldData.id_commune
                    const number_death = 0
                    const number_suspect = 0
                    const number_confirmed_cases = 0
                    const number_recovered= 0
                    const number_sick = 0
                    const keys = {
                      number_death,
                      number_suspect,
                      number_confirmed_cases,
                      number_recovered,
                      number_sick
                    }
                    this.patchCommune(id,keys)
                }
                resolve()
              }, 1000)
            }),
        }}
      />



      </Box>
      </Box>
      
     
      </div>
    );
  }
}

export default withStyles(styles)(AgentForm);
