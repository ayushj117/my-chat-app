import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from "@material-ui/core";
import Chat from '../Chat';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


export default class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openList: false,
    };
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = (value) => {
    this.setState({ open: value });
  };


  handleSubmit = (form) => {
    this.setState({ open: false, openList: true, data: form });
    // const { history } = this.props;
    // console.log('----31----', typeof form.email, this.props);
    // history.push(`/login/${form.password}`);
    console.log('@@@', form);
  };

  render() {
    let final=[];
    const GET_MESSAGES = gql`
    query MESSAGES($name: String!, $email: String!, $data: String! ){
      getMessage(to: $name, from: $email, data: $data) {
        fromMessage
        }
    }
  `;
    const { match } = this.props;
    const { params } = match;
    const { name, email } = params;
    let data = "ayush";
    return (
          <>
          <Query query={GET_MESSAGES} variables={{ name, email, data }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading......<CircularProgress size={24} thickness={4} /></p>;
            if (error) return <p>An error occurred..{error.message}</p>;
            console.log('--------', typeof data.getMessage.message);
            Object.values(data.getMessage).forEach((res) => {
              if(typeof res === 'object'){
                final = res
                console.log('!!!!', final);
              }
            })

            return !loading && (
              <>
              <Chat msgData={final} {...this.props} />
              </>
            );

          }}
          
          </Query>
          </>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
