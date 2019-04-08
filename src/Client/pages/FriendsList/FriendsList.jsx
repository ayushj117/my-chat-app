import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Table, CircularProgress, Button } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import FriendsCheckBox from "../FriendsCheckBox";

const styles = theme => ({
  root: {
    width: "96%",
    margin: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    cursor: "pointer"
  },
  iconButton: {
    display: "flex"
  },
  button: {
    margin: theme.spacing.unit
  }
});

const propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};

// default values for props:
const defaultProps = {
  open: false,
  classes: {}
};

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      friends: []
    };
  }

  handleSubmit = (e, values) => {
    const { form } = this.state;
    const { onSubmit } = this.props;
    onSubmit(form);
  };

  handleSelect = ID => () => {
    const { history } = this.props;
    window.localStorage.setItem("name", ID);

    const email = localStorage.getItem("email");
    history.push(`/login/${email}/${ID}`);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ open: value });
  };

  handleSubmit = friends => {
    console.log("-------", friends);
    this.setState({ open: false, friends });
  };

  render() {
    const { open, friends } = this.state;
    const { classes } = this.props;
    const email = localStorage.getItem("email");
    let final = [];
    let addedFriends = [];
    const GET_FRIENDS = gql`
      query FRIENDS($email: String!) {
        friends(email: $email) {
          name
        }
      }
    `;

    const ADDED_FRIENDS = gql`
    query GETFRIENDS($email: String!, friend: [String]!) {
      getFriends(email: String!, friend: [String]!) {
        name
      }
    }
  `;

    return (
      <>
        <Query query={GET_FRIENDS} variables={{ email }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <p>
                  Loading...
                  <CircularProgress size={24} thickness={4} />
                </p>
              );
            if (error) return <p>`error...${error.message}`</p>;
            Object.values(data.friends).forEach(res => {
              if (typeof res === "object") {
                final = res;
                console.log("!!!!", final);
              }
            });
            window.localStorage.setItem("friends", final);
            return (
              !loading && (
                <>
                  <div>
                    <div style={{ margin: 10, textAlign: "right" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={this.handleClickOpen}
                      >
                        Add Friends
                      </Button>
                    </div>
                    <FriendsCheckBox
                      open={open}
                      {...this.props}
                      onClose={this.handleClose}
                      onSubmit={this.handleSubmit}
                    />
                  </div>
                  <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow key="col">
                            <React.Fragment>
                              <TableCell align="center">NAMES</TableCell>
                            </React.Fragment>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {final.map(row => (
                            <TableRow className={classes.row} key={row} hover>
                              <TableCell
                                align="center"
                                key={row}
                                // eslint-disable-next-line no-underscore-dangle
                                onClick={this.handleSelect(row)}
                              >
                                {row}
                              </TableCell>
                            </TableRow>
                          ))}
                          {friends ? (
                            <Query
                              query={ADDED_FRIENDS}
                              variables={{ email, friends }}
                              pollInterval={300}
                            >
                              {({ loading, error, data }) => {
                                if (loading)
                                  return (
                                    <p>
                                      <CircularProgress
                                        size={24}
                                        thickness={4}
                                      />
                                    </p>
                                  );
                                if (error)
                                  return <p>`error...${error.message}`</p>;
                                Object.values(data.getFriends).forEach(res => {
                                  if (typeof res === "object") {
                                    addedFriends = res;
                                    console.log("!!!!", addedFriends);
                                  }
                                });
                                return (
                                  !loading && (
                                    <>
                                      {addedFriends.map(row => (
                                        <TableRow
                                          className={classes.row}
                                          key={row}
                                          hover
                                        >
                                          <TableCell
                                            align="center"
                                            key={row}
                                            // eslint-disable-next-line no-underscore-dangle
                                            onClick={this.handleSelect(row)}
                                          >
                                            {row}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </>
                                  )
                                );
                              }}
                            </Query>
                          ) : (
                            ""
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </Paper>
                </>
              )
            );
          }}
        </Query>
      </>
    );
  }
}

FriendsList.propTypes = propTypes;
FriendsList.defaultProps = defaultProps;

export default withStyles(styles)(FriendsList);
