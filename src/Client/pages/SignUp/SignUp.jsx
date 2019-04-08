import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  CircularProgress,
  TextField,
  IconButton,
  InputAdornment,
  Paper,
  Typography
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  Email,
  AccountCircle,
  People
} from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import gql from "graphql-tag";
import { Query, Mutation, Subscription } from "react-apollo";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  error: {
    color: "red"
  }
});

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      form: {
        name: "",
        password: "",
        email: ""
      }
    };
  }

  handleChange = field => event => {
    const { form } = this.state;

    this.setState({
      form: { ...form, [field]: event.target.value }
    });
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;

    history.push("/login");
  };

  render() {
    const { classes, ...rest } = this.props;
    const { showPassword, form } = this.state;
    const { name, email, password } = form;
    const ADD_USER = gql`
  mutation ADDUSER(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addUser(name: String!, email: String!, password: String!) {
      name
    }
  }
`;

    return (
      <>
        <Mutation
          mutation={ADD_USER}
          variables={{ name, email, password }}
        >
          {(addUser, { loading, error, data }) => {
            if (loading)
              return (
                <p>
                  Loading......
                  <CircularProgress size={24} thickness={4} />
                </p>
              );
            if (error)
              return (
                <p>An error occurred.. inside mutation --{error.message}</p>
              );

            return (
              <>
                <main {...rest} className={classes.main}>
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <AccountCircle />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign Up
                    </Typography>
                    <form className={classes.form}>
                      <TextField
                        fullWidth
                        id="outlined-name-input"
                        label="name Address"
                        className={classes.textField}
                        type="name"
                        name="name"
                        autoComplete="name"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("name")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <People />
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        fullWidth
                        id="outlined-email-input"
                        label="Email Address"
                        className={classes.textField}
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("email")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email />
                            </InputAdornment>
                          )
                        }}
                      />
                      <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Password"
                        className={classes.textField}
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange("password")}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={e => {
                          this.handleSubmit(e);
                        }}
                      >
                        <b>SIGN UP</b>
                      </Button>
                    </form>
                  </Paper>
                </main>
              </>
            );
          }}
          ); }}
        </Mutation>
      </>
    );
  }
}

Login.propTypes = propTypes;

export default withStyles(styles)(Login);
