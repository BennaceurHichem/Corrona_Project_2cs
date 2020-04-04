import * as React from 'react';
import {render} from 'react-dom';
import {Formik, Form, Field} from 'formik';
import * as Yup from "yup";
import './login.css'
import {
  Button,
  LinearProgress,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch,
} from 'formik-material-ui';
import {
  TimePicker,
  DatePicker,
  DateTimePicker,
} from 'formik-material-ui-pickers';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

interface Values {
  email: string;
}


function UpperCasingTextField(props: TextFieldProps) {
  const {
    form: {setFieldValue},
    field: {name},
  } = props;
  const onChange = React.useCallback(
    event => {
      const {value} = event.target;
      setFieldValue(name, value ? value.toUpperCase() : '');
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

const Login = () => (
  <Formik
    initialValues={{
      firstname:'',
      lastname:'',
      email: '',
      password: '',
      confirmpassword:'',
      poste: 'none',
      tags: [],
    
    }}
    validate={values => {
      console.log(values)
      const errors: Partial<Values> = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      errors.firstname =  values.firstname < 5 ? 'first Name must be 5 characters long!' : '';

      errors.lastname =  values.lastname < 5 ? 'last Name must be 5 characters long!' : '';

      if (values.password !== values.confirmpassword) {
          errors.confirmpassword = "password must match"
      }

      return errors;
    }}

        onSubmit={(values, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}

    render={({submitForm, isSubmitting, values, setFieldValue}) => (


  
        <Form>
         <Field
            component={TextField}
            name="firsname"
            type="text"
            label="First Name "
            required
          />
          <br />
           <Field
            component={TextField}
            name="lastname"
            type="text"
            label="Last Name"
            required
          />
           <br />
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
            required
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
            required
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Confirm Password"
            name="confirmpassword"
            required
          />
         
          <br />
          <FormControl>
            <InputLabel shrink={true} htmlFor="poste">
              Poste
            </InputLabel>
            <Field
            required
              component={Select}
              type="text"
              name="poste"
              inputProps={{name: 'poste', id: 'poste'}}
            >
              <MenuItem value="moderateur">Moderateur</MenuItem>
              <MenuItem value="redacteur">Redacteur</MenuItem>
              <MenuItem value="agent_sante">Agent de santè </MenuItem>

            </Field>
          </FormControl>
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
         
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
   
    )}
  />
);



export default Login;
