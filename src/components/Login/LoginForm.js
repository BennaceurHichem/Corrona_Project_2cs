import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormLabel } from "@material-ui/core";
import { FormGroup } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { spacing } from "@material-ui/system";
import { FormikTextField, FormikSelectField } from "formik-material-fields";
import Icon from "@material-ui/core/Icon";
import Logo from "assets/img/coronaWatchLogo.png";
import API from "../../api"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  withRouter
} from "react-router-dom";

import history from '../../history'


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  customtextField: {
    variant: "outlined",
    margin: "normal",
    id: "username",
    label: "username Address",
    name: "username",
    autoComplete: "username"
  }
}));

export default function LoginForm() {
  {
    const classes = useStyles();
    return (
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            ,

          password: Yup.string()
           
            .required("fill your password to authnticate")
        })}
        onSubmit={fields => {
          //alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
          const username  = fields.username
          const password = fields.password

         /* if(username==="admin@corronawatch.com" && password ==="rootroot") {
            history.push('/admin/dashboard')
          }    
          else if(username==="redacteur@corronawatch.com"){
            history.push('/redacteur/dashboardredacteur')
          }    
          else if(username==="agent@corronawatch.com"){
               history.push('/agent/dashboardagent') 
          } 
          else{
            alert("usr or password not valid")
          }
              */

          const data={
            username: username,
            password : password
          }
          API.post('users/api-token-auth',
     
     data
   ,{
   headers:{
     Authorization:'Basic YWRtaW46YWRtaW4=',
   
     'Accept': 'application/json',
     'Content-Type': 'application/json',

   }
  }).then(res=>{
    console.log(res)
    localStorage.setItem('user', res)
    localStorage.setItem('user', res.token)

    alert("تم قبول الفيديو بنجاح ! ")
  
  }).catch(err=>{
  alert("خلل في تأكيد الفيديو ! "+err)
  
  })

        }}
        render={({ status, touched, errors }) => (
          <div className={classes.paper}>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <div>
              <Form className={classes.form} as={FormGroup}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <div className="form-group">
                    <FormikTextField
                      as={TextField}
                      name="username"
                      type="text"
                      variant="outlined"
                      margin="normal"
                      required
                      id="username"
                      label="username Address"
                      autoComplete="username"
                      autoFocus
                    />
                  </div>
                  <div className="form-group">
                    <FormikTextField
                      as={TextField}
                      name="password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      required
                      id="password"
                      label="Password"
                      
                    />
                  </div>
                </Grid>

                <div style={{ marginTop: "2%" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    icon={<Icon>send</Icon>}
                  >
                    Send
                  </Button>
                  <Button
                    type="reset"
                    variant="contained"
                    className={classes.button}
                  >
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
        //fin Formik 
      />
    );
  }
}
