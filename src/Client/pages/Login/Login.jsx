/* import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_USER = gql`
  query GetPosts {
    getAllUser {
      id
      email
      password
    }
  }
`;

export default () => (
  <Query query={GET_USER}>
    {({ loading, error, data }) => {
      console.log(data);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>error...</p>;
      return !loading && (
      <>
        <thead>
          <tr>
            <th>a</th>
            <th>v</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUser.map(post => (
            <tr key={post.id}>
              <td>{post.email}</td>
              <td>{post.password}</td>
            </tr>
          ))}
        </tbody>
        </>
    )
  }}
  </Query>
); */


import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, FormHelperText, IconButton, InputAdornment,
} from '@material-ui/core';
import {
  Visibility, VisibilityOff, Email,
} from '@material-ui/icons';
import * as yup from 'yup';



const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  error: {
    color: 'red',
    margin: 10,
  },
});

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

// default values for props:
const defaultProps = {
  open: false,
  classes: {},
};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

class Login extends React.Component {
  schema = yup.object().shape({
    name: yup
      .string()
      .required(),
    email: yup.string().email().required(),
    password: yup.string().matches(passwordRegex, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number').required(),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match').required().label('confirm password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loader: false,
      form: {
        password: '',
        email: '',
      },
      error: {
        password: '',
        email: '',
      },
      isTouched: {
        password: false,
        email: false,
      },
    };
  }


  handleChange = field => (event) => {
    const { isTouched, form } = this.state;

    this.setState({
      form: { ...form, [field]: event.target.value },
      isTouched: { ...isTouched, [field]: true },
    }, this.handleValidate(field));
  };

  handleValidate = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      email, password,
    } = form;
    this.schema.validate({
      email, password,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      if (!err.inner.some(er => er.path === field)) {
        this.setState({
          error: { ...error, [field]: '' },
          isTouched: { ...isTouched, [field]: true },
        });
      }
    });
  }

  handleOnBlur = field => () => {
    const {
      form, error, isTouched,
    } = this.state;
    const {
      email, password,
    } = form;
    this.schema.validate({
      email, password,
    }, { abortEarly: false }).then(() => {
      this.setState({
        error: { ...error, [field]: '' },
        isTouched: { ...isTouched, [field]: true },
      });
    }).catch((err) => {
      err.inner.forEach((er) => {
        if (er.path === field) {
          this.setState({
            error: { ...error, [field]: er.message },
            isTouched: { ...isTouched, [field]: true },
          });
        }
      });
    });
  }

  hasError = () => {
    const { error } = this.state;
    if (error.email === '' && error.password === '') {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const { isTouched, error } = this.state;
    let result = '';
    if (isTouched[field] === true) {
      result = error[field];
    }
    return result;
  }

  showBooleanError = (field) => {
    const { isTouched } = this.state;
    if (isTouched[field] === true) {
      return true;
    }
    return false;
  }

  buttonChecked = () => {
    const { isTouched } = this.state;
    let touched = 0;
    let result = false;
    const checkError = this.hasError();
    Object.keys(isTouched).forEach((i) => {
      if (isTouched[i] === true) {
        touched += 1;
      }
    });
    if (!checkError && touched === 2) {
      result = true;
    } else if (checkError && touched !== 2) {
      result = false;
    }
    return result;
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleSubmit = (e) => {
    const { form } = this.state;
    const { onSubmit } = this.props;
    onSubmit(form);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  render() {
    const { open, classes } = this.props;
    const {
      showPassword, loader,
    } = this.state;


    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              id="outlined-email-input"
              label="Email"
              error={this.showBooleanError('email')}
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('email')}
              onBlur={this.handleOnBlur('email')}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email /></InputAdornment>,
              }}
            />
            <FormHelperText id="component-error-text2" className={classes.error}>
              {this.getError('email')}
            </FormHelperText>
            <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  error={this.showBooleanError('password')}
                  className={classes.textField}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange('password')}
                  onBlur={this.handleOnBlur('password')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText id="component-error-text3" className={classes.error}>
                  {this.getError('password')}
                </FormHelperText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
                <Button
                  color="primary"
                  disabled={(!this.buttonChecked() || loader)}
                  onClick={(e) => {
                    this.handleSubmit(e);
                  }}
                >
                  {
                    (!loader)
                      ? <b>Login</b>
                      : <CircularProgress size={24} thickness={4} />
                  }
                </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default withStyles(styles)(Login);
