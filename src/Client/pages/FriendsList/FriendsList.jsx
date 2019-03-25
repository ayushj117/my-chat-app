import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';


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

  render() {
    const { result } = this.props;
    let final = {};
  const GET_USER = gql`
  query {
    getAllUser {
      id
      email
      password
    }
  }
`;

    return (
      <>
        <Query query={GET_USER}>
    {({ loading, error, data }) => {
      console.log('%%%%', data.getAllUser);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>error...</p>;
      data.getAllUser.forEach((user) => {
      console.log('####', user);
      if (result.email === user.email) {
        final = user;
      }
    })
    console.log('-----------===', final);
    console.log('//////////', Object.values(final));
    
        return !loading && (
          <>
          <thead>
            <tr>
              <th>a</th>
              <th>v</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(final).map(post => (
              <tr key={post}>
                <td>{post}</td>
                <td>{post}</td>
              </tr>
            ))}
          </tbody>
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
