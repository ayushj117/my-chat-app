import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Toolbar,
  Fab,
  Button,
  CircularProgress,
  TextField
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { KeyboardBackspace } from "@material-ui/icons";
import gql from "graphql-tag";
import { Query, Mutation, Subscription } from "react-apollo";

const styles = theme => ({
  root: {
    width: "90%",
    margin: theme.spacing.unit * 5,
    overflowX: "auto"
  },
  nav: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  textField: {
    width: "90%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  card: {
    minWidth: 275,
    margin: theme.spacing.unit
  },
  title: {
    fontSize: 14
  },
  avatar: {
    margin: 10
  },
  back: {
    textAlign: "right"
  },
  fromChat: {
    textAlign: "right"
  }
});

const propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object
};

// default values for props:
const defaultProps = {
  open: false,
  classes: {}
};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typedMessage: ""
    };
  }

  handleChange = () => event => {
    this.setState({
      typedMessage: event.target.value
    });
  };

  handleClick = async (e, addMessage) => {
    e.preventDefault();
    const { typedMessage } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { name, email } = params;
    await addMessage(name, email, typedMessage);
    console.log("inside handleClick ", typedMessage);
  };

  handleBack = e => {
    e.preventDefault();
    const { history } = this.props;
    history.push(`/`);
  };

  render() {
    const { classes } = this.props;
    console.log("inside list----", this.props);
    const { typedMessage } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { name, email } = params;
    const { msgData } = this.props;
    let final = [];
    const ADD_MESSAGES = gql`
      mutation MESSAGES(
        $name: String!
        $email: String!
        $typedMessage: String!
      ) {
        addMessage(to: $name, from: $email, data: $typedMessage) {
          toMessage
        }
      }
    `;

    const SHOW_NAME = gql`
      query NAME($email: String!) {
        getUser(email: $email) {
          name
        }
      }
    `;

    const MESSAGE_SUBSCRIPTION = gql`
      subscription messageAdded($email: String!) {
        messageAdded(from: $email) {
          toMessage
        }
      }
    `;

    return (
      <>
        <Query query={SHOW_NAME} variables={{ email }}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            let fromName = data.getUser.name;
            console.log("-====--=-=-131=-=-=", data.getUser.name);
            return (
              !loading && (
                <>
                  <Mutation
                    mutation={ADD_MESSAGES}
                    variables={{ name, email, typedMessage }}
                  >
                    {(addMessage, { loading, error, data }) => {
                      if (loading)
                        return (
                          <p>
                            Loading......
                            <CircularProgress size={24} thickness={4} />
                          </p>
                        );
                      if (error)
                        return <p>An error occurred..{error.message}</p>;
                      console.log("--------", data);
                      if (data) {
                        Object.values(data).map(res => {
                          Object.values(res).map(arr => {
                            if (typeof arr === "object") {
                              final = arr;
                            }
                          });
                        });
                      }

                      return (
                        !loading && (
                          <>
       {/*                                    <Subscription
                                    subscription={MESSAGE_SUBSCRIPTION}
                                    variables={{ email }}
                                  >
                                      {({ data, loading }) => {
                                        console.log('inside ------subs9----', data);
                                        return (
                                      <h4>New comment: {!loading && data}</h4>
                                        );
                                      }}
                                    </Subscription> */}

                            <Paper className={classes.root}>
                              <div className={classes.nav}>
                                <AppBar position="static">
                                  <Toolbar>
                                    <Avatar className={classes.avatar}>
                                      A
                                    </Avatar>
                                    <Typography
                                      variant="h6"
                                      color="inherit"
                                      className={classes.grow}
                                    >
                                      {match.params.name}
                                    </Typography>
                                    <Fab
                                      size="small"
                                      color="secondary"
                                      aria-label="Add"
                                      onClick={e => this.handleBack(e)}
                                    >
                                      <KeyboardBackspace />
                                    </Fab>
                                  </Toolbar>
                                </AppBar>
                              </div>
                              <Card className={classes.card}>
                                <CardContent>
                                  {msgData.map(msg => (
                                    <>
                                      <Typography
                                        className={classes.pos}
                                        color="textSecondary"
                                        variant="caption"
                                      >
                                        {match.params.name}
                                      </Typography>
                                      <Typography
                                        className={classes.pos}
                                        variant="body2"
                                        gutterBottom
                                      >
                                        {msg}
                                      </Typography>
                                    </>
                                  ))}
                                  <div className={classes.fromChat}>
                  
                                    {final.map(tomsg => (
                                      <>
                                          <Typography
                                            className={classes.pos}
                                            color="textSecondary"
                                            variant="caption"
                                          >
                                            {fromName}
                                          </Typography>
                                          <Typography
                                            className={classes.pos}
                                            variant="body2"
                                            gutterBottom
                                          >
                                            {tomsg}
                                          </Typography>
                                      </>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                              <TextField
                                className={classes.textField}
                                margin="normal"
                                placeholder="Start Typing"
                                onChange={this.handleChange()}
                              />
                              <Fab
                                color="primary"
                                aria-label="Add"
                                className={classes.fab}
                                onClick={e => this.handleClick(e, addMessage)}
                              >
                                <SendIcon />
                              </Fab>
                            </Paper>
                          </>
                        )
                      );
                    }}
                  </Mutation>
                </>
              )
            );
          }}
        </Query>
      </>
    );
  }
}

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

export default withStyles(styles)(Chat);
