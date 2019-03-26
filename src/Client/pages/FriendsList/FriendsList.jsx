import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const styles = theme => ({
  root: {
    width: '96%',
    margin: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    cursor: 'pointer',
  },
  iconButton: {
    display: 'flex',
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

class FriendsList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }


  handleSubmit = (e, values) => {
    const { form } = this.state;
    const { onSubmit } = this.props;
    onSubmit(form);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  handleSelect = ID => () => {
    const { result } = this.props;
    console.log('inside select handler', result);
  }

  render() {
    const { result, classes } = this.props;
    const { email } = result;
    let final=[];
  const GET_FRIENDS = gql`
  query FRIENDS($email: String!){
    friends(email: $email) {
      name
    }
  }
`;

    return (
      <>
        <Query query={GET_FRIENDS} variables={{ email }}>
    {({ loading, error, data }) => {
      console.log('%%%%', data.friends);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>`error...${error.message}`</p>;
      Object.values(data.friends).forEach((res) => {
        if(typeof res === 'object'){
          final = res
          console.log('!!!!', final);
        }
      })
        return !loading && (
          <>
                  <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow key="col">
                    <React.Fragment>
                      <TableCell
                        align="center"
                      >
                        NAMES
                      </TableCell>
                    </React.Fragment>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {(final).map(row => (
                  <TableRow
                    className={classes.row}
                    key={row}
                    hover
                  >
                      <TableCell
                        align="center"
                        key={row.name}
                        // eslint-disable-next-line no-underscore-dangle
                        onClick={this.handleSelect(row)}
                      >
                        {row}
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Paper>
          </>
              )
          }}
          </Query>
      </>
    );
  }
}

FriendsList.propTypes = propTypes;
FriendsList.defaultProps = defaultProps;

export default withStyles(styles)(FriendsList);