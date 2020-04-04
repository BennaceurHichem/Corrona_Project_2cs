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


//this css file is necessary for the texterror label of material ui to make the message above the textField Directly 

import './login.css'
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
    id: "email",
    label: "Email Address",
    name: "email",
    autoComplete: "email"
  }
}));

export default function SignupForm() {
  {
    const classes = useStyles();
    return (
      <Formik
        initialValues={{
          firstName: "",

          email: "",
          password: "",
          confirmPassword: "",
          poste: ""
        }}
        validationSchema={Yup.object().shape({
          fullname: Yup.string().required("please fill your full name "),

          email: Yup.string()
            .email("Email is invalid")
            .required(""),
          poste: Yup.string().required("choose your own poste"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required(""),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("")
        })}
        onSubmit={fields => {
          alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
        }}
        render={({ status, touched, errors }) => (
          <div className={classes.paper}>
           

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>




            <div >
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
                      name="fullname"
                      type="text"
                      autoFocus
                      margin="normal"
                      id="fullname"

                      autoComplete="firstName"
                      variant="outlined"
                      error={false}
                      helperText=""
                  
                    />
                  </div>

                  <div className="form-group">
                    <FormikTextField
                      as={TextField}
                      name="email"
                      type="text"
                      variant="outlined"
                      margin="normal"
                      required
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      
                      error={false}
                       helperText=""
                     
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
                      
                      error={false}
                       helperText=""
                    />
                  </div>
                  <div className="form-group">
                    <FormikTextField
                      as={TextField}
                      name="confirmPassword"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      required
                      id="confirmPassword"
                      label="password Confirmation"
                      
                      error={false}
                      helperText=""
                    />
                  </div>
                  <div className="form-group">
                    <FormikSelectField
                      name="poste"
                      options={[
                        { label: "moderateur", value: "moderateur" },
                        { label: "redacteur", value: "redacteur" },
                        { label: "agent_sante", value: "agent_sante" }
                      ]}
                      label="Poste"
                      id="poste"
                      variant="outlined"
                      required
                      error={false}
                       helperText=""
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
