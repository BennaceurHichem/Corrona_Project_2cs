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

import wilayas from "./wilayas_api.json";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from 'lodash'   
import Table from 'components/Table/Table'
import MaterialTable from 'material-table';
import Typography from "@material-ui/core/Typography";
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar';


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

class AgentForm extends React.Component {
  constructor(props) {
    super(props);
   

  
 
    this.state = {
      data:[],
      all_commune: [],
      all_wilayas: [],
      initialTableData: [],
      choosedWilaya: "",
      commune_api:[],
      choosedWilayaNumber: 0,
     
      //this will be used when the user start picking their commune where he couldn't change the wilayas until he delete all communes
      is_wilayasdisabled: false,
      number_recovered: 0,
      number_death: 0,
      number_confirmed_cases: 0,
      number_carrier: 0,
      "number_carrier": 0,
      "number_suspect": 0,
        
        
      
    
    };
  }


/*

Convert wilaya id(code) to the specific srting 

*/
  getWilayaStringFromId(id){
   
    return wilayas.filter(i=>i.code===id)[0].name
  }
  /*
get All Communes from backend   api  

*/
  
  getCommunes()
{

  const townsUrl = '/geolocation/towns/'
  return API.get(townsUrl,{
    headers:{
      Authorization:'Basic YWRtaW46YWRtaW4=',
    
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    }
  })
 

}

  /*
get All wilayas from backend   api  

*/
getWilayas(){


  const token = "YWRtaW46YWRtaW4="
  //const headers = { 'Authorization':+' Basic YWRtaW46YWRtaW4=' };
  const url = 'geolocation/states/'
  return API.get(url,{
    headers:{
      Authorization:'Basic YWRtaW46YWRtaW4=',
    
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    }
  })
 

}

  /*
Api calls are made here with their treatement 
**filtering communes data and display only treated communes by agent de sante in the table 
**adding loading bar to viualize the api call loading 
**parallel api calls for optimizing the time of response 
**validation of the data and handling errors 
*/
  componentDidMount() {

   
    this.LoadingBar.continuousStart()
    Promise.all([this.getWilayas(), this.getCommunes()])
    .then(([all_wilayas, all_commune])  => {


      this.LoadingBar.complete()

      const dataWilayas = all_wilayas.data;
      const dataCommunes =all_commune.data;
      //this array contain all communes treated before(where all number are zeroes), this is for displaying these data initialy on the table 
      const initialData = dataCommunes.filter(function(item) {
        console.log("item"+ item)
        return ( item.number_confirmed_cases !=0 && item.number_death !=0)
      })
        let buffer=[]
        let finalData=[]
        /*
Create conformed date with the table data to display initially
Displayed data verify the number_death!==0 && number_cases!==0, only those communes will be displayd initially 
*/
       finalData = initialData.map( (element)=>
            
             buffer.push({
              number_confirmed_cases: element.number_confirmed_cases,
              number_death: element.number_death,
              number_suspect: element.number_suspect,
              number_carrier: element.number_carrier,
              number_recovered: element.number_recovered,
              number_sick: element.number_sick,
              nom_wilaya: this.getWilayaStringFromId(element.state),
              nom_commune:element.name,
              id_commune: element.id
             
            })
        
      )
            
      console.log("typeof data"+typeof initialData)
        console.log("init data"+initialData)
        this.setState((prevState)=>({
          all_wilayas: dataWilayas,
          all_commune:dataCommunes,
          data: [...prevState.data,...buffer]
              
          
        }));
    });
    
    
        


    
        



  }

  //get all commune of a specific wilayas
  findCommuneByWilayas(communes, wilaya_num) {
    console.log("wilaays num "+ wilaya_num)
    return communes.filter((element) => {
      return element.state == wilaya_num;
    });
  }

  /*


  */
  handleChoixWilayas = (e, value, reason) => {

    this.setState((prevState) => ({
      choosedWilaya: value ? value.nom : "invalid",
      choosedWilayaNumber: value.code,
      //if not exist insert 
      wilayas_communes:  prevState.wilayas_communes.concat(value) ,
    }));

   
  };

  handleChoixCommune = (e, value, reason) => {
   
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
    const townsUrl = `/geolocation/towns/${id}`
    return API.patch(townsUrl,
      
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
handleNbCarrier = (e)=>{

    console.log("value Gueris"+e.target.value)
    const num = e.target.value;
    this.setState({

        number_carrier:num,
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
              Remplissage des Informations des wilayas et communes affectè 
            </Typography>
            <Typography component="h1" variant="subtitle1" gutterBottom="true">
            this table contain the story of affected communes with the possibility of adding, updating or deleting 
            any Communes information  
            </Typography>

      <MaterialTable
        title="Remplissage et Traitement d'informations des communes"
        columns={[
        { title: 'Wilayas', field: 'nom_wilaya' ,
        editComponent: props => (
          <Autocomplete
          
                      id="wilayas-field"
                      style={{
                        width: 100,
                      }}
                      disableClearable
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
                      disableClearable
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
        { title: 'Cases Number', field: 'number_confirmed_cases', type: 'numeric' },
        { title: 'Recovered Number', field: 'number_recovered', type: 'numeric' },
        { title: 'Carrier Number', field: 'number_carrier', type: 'numeric' },
        { title: 'Death Number', field: 'number_death', type: 'numeric' },
        { title: 'Suspect Number', field: 'number_suspect', type: 'numeric'}
      
      ]}
        data={this.state.data}

      editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                
                  

                    const id  = newData.id_commune
                    const number_death = newData.number_death>=0 ?newData.number_death:0
                    const number_suspect = newData.number_suspect>=0 ?newData.number_suspect:0
                    const number_confirmed_cases = newData.number_confirmed_cases>=0 ?newData.number_confirmed_cases:0
                    const number_recovered= newData.number_recovered>=0 ?newData.number_recovered:0
                    const number_carrier = newData.number_carrier>=0? newData.number_carrier:0
                    const keys = {
                      number_death,
                      number_suspect,
                      number_confirmed_cases,
                      number_recovered,
                      number_carrier
                    }
                    this.patchCommune(id,keys).then((response) => {
                                            // Success 🎉
                                            console.log(response);

                                            const data = this.state.data;
                                            if(newData.number_death<0)  newData.number_death=0
                                            if(newData.number_suspect<0)  newData.number_suspect=0
                                            if(newData.number_confirmed_cases<0)  newData.number_confirmed_cases=0
                                            if(newData.number_recovered<0)  newData.number_recovered=0
                                            if(newData.number_carrier<0)  newData.number_carrier=0
                                          
                                            data.push(newData);
                                            this.setState({ data }, () => resolve());

                                        })
                                        .catch((error) => {
                                            // Error 😨
                                            if (error.response) {
                                                /*
                                                * The request was made and the server responded with a
                                                * status code that falls out of the range of 2xx
                                                */

                                                alert("Incorrect data, please try again")
                                                console.log(error.response.data);
                                                console.log(error.response.status);
                                                console.log(error.response.headers);
                                            } else if (error.request) {

                                              alert("Incorrect data, please try again")
                                                /*
                                                * The request was made but no response was received, `error.request`
                                                * is an instance of XMLHttpRequest in the browser and an instance
                                                * of http.ClientRequest in Node.js
                                                */
                                                console.log(error.request);
                                            } else {
                                              alert("Incorrect data, please try again")
                                                // Something happened in setting up the request and triggered an Error
                                                console.log('Error', error.message);
                                            }
                                            console.log(error.config);
                                        });


                }
                resolve()
              }, 3000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log("newData: "+ Object.keys(newData) )
              setTimeout(() => {
                {

                 
                  const id  = newData.id_commune
                    console.log("oldData id_commune :"+oldData.id_commune)
                    console.log("newData id_commune :"+newData.id_commune)
                    const number_death = newData.number_death >=0 ?newData.number_death:0
                    const number_suspect = newData.number_suspect>=0 ?newData.number_suspect:0
                    const number_confirmed_cases = newData.number_confirmed_cases>=0 ?newData.number_confirmed_cases:0
                    const number_recovered= newData.number_recovered>=0 ?newData.number_recovered:0
                    const number_carrier = newData.number_carrier>=0 ? newData.number_carrier:0

                  const keys = {
                    number_death,
                    number_suspect,
                    number_confirmed_cases,
                    number_recovered,
                    number_carrier
                  }
                  this.patchCommune(id,keys).then((response) => {
                                            // Success 🎉
                                            console.log(response);

                                          
                                            if(newData.number_death<0)  newData.number_death=0
                                            if(newData.number_suspect<0)  newData.number_suspect=0
                                            if(newData.number_confirmed_cases<0)  newData.number_confirmed_cases=0
                                            if(newData.number_recovered<0)  newData.number_recovered=0
                                            if(newData.number_carrier<0)  newData.number_carrier=0

                                            const data = this.state.data;
                                            const index = data.indexOf(oldData);
                                            data[index] = newData;
                 
                                            this.setState({ data }, () => resolve());
                                            

                                        })
                                        .catch((error) => {
                                            // Error 😨
                                            if (error.response) {
                                                /*
                                                * The request was made and the server responded with a
                                                * status code that falls out of the range of 2xx
                                                */

                                                alert("Incorrect data, please try again")
                                                console.log(error.response.data);
                                                console.log(error.response.status);
                                                console.log(error.response.headers);

                                            } else if (error.request) {

                                              alert("Incorrect data, please try again")
                                                /*
                                                * The request was made but no response was received, `error.request`
                                                * is an instance of XMLHttpRequest in the browser and an instance
                                                * of http.ClientRequest in Node.js
                                                */
                                                console.log(error.request);
                                            } else {
                                              alert("Incorrect data, please try again")
                                                // Something happened in setting up the request and triggered an Error
                                                console.log('Error', error.message);
                                            }
                                            console.log(error.config);
                                        });

                    //this.patchCommune()

                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
               

                  const id  = oldData.id_commune
                    const number_death = 0
                    const number_suspect = 0
                    const number_confirmed_cases = 0
                    const number_recovered= 0
                    const number_carrier = 0
                    const keys = {
                      number_death,
                      number_suspect,
                      number_confirmed_cases,
                      number_recovered,
                      number_carrier
                    }
                    this.patchCommune(id,keys).then((response) => {
                                            // Success 🎉
                                            console.log(response);

                                            let data = this.state.data;
                                            const index = data.indexOf(oldData);
                                            data.splice(index, 1);
                                            this.setState({ data }, () => resolve());
                                          
                                    
                                        
                                         
                                            

                                        })
                                        .catch((error) => {
                                            // Error 😨
                                            if (error.response) {
                                                /*
                                                * The request was made and the server responded with a
                                                * status code that falls out of the range of 2xx
                                                */

                                                alert("Incorrect data, please try again")
                                                console.log(error.response.data);
                                                console.log(error.response.status);
                                                console.log(error.response.headers);

                                            } else if (error.request) {

                                              alert("Incorrect data, please try again")
                                                /*
                                                * The request was made but no response was received, `error.request`
                                                * is an instance of XMLHttpRequest in the browser and an instance
                                                * of http.ClientRequest in Node.js
                                                */
                                                console.log(error.request);
                                            } else {
                                              alert("Incorrect data, please try again")
                                                // Something happened in setting up the request and triggered an Error
                                                console.log('Error', error.message);
                                            }
                                            console.log(error.config);
                                        });


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
