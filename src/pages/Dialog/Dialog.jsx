import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, CircularProgress, TextField,
  FormHelperText, IconButton, InputAdornment, Paper, Typography,
} from '@material-ui/core';
import {
  Visibility, VisibilityOff, Email,
} from '@material-ui/icons';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import * as yup from 'yup';
import { callApi } from '../../lib/utils/api';
import { SnackbarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  error: {
    color: 'red',
  },
});

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

class Login extends React.Component {
  schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      loader: false,
      snackCheck: false,
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

handleSubmit = async (e, values) => {
  e.preventDefault();
  const { form } = this.state;
  this.setState({
    loader: true,
  });
  const result = await callApi('post', form, 'user/login');
  // eslint-disable-next-line react/prop-types
  const { children } = this.props;
  if (result.status) {
    this.setState({
      loader: false,
    });
    window.localStorage.setItem('token', result.data.data);
    children.props.history.push('/trainee');
  } else {
    values.openSnack('Not Valid', 'error');
    this.setState({
      snackCheck: true,
      loader: false,
    });
  }
}


render() {
  const { classes, ...rest } = this.props;
  const { showPassword, loader, snackCheck } = this.state;
  return (
    <>
      <main {...rest} className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Log in
          </Typography>
          <form className={classes.form}>
            <TextField
              fullWidth
              error={this.showBooleanError('email')}
              id="outlined-email-input"
              label="Email Address"
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
              error={this.showBooleanError('password')}
              id="outlined-password-input"
              label="Password"
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
            {
              <SnackbarConsumer>
                {value => (
                  <Button
                    type="submit"
                    fullWidth
                    disabled={(!this.buttonChecked() || loader)}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(e) => {
                      this.handleSubmit(e, value);
                    }}
                  >
                    {
                      (!loader || snackCheck)
                        ? <b>SIGN IN</b>
                        : <CircularProgress size={24} thickness={4} />
                    }
                  </Button>
                )}
              </SnackbarConsumer>
            }

          </form>
        </Paper>
      </main>
    </>
  );
}
}

Login.propTypes = propTypes;

export default withStyles(styles)(Login);
