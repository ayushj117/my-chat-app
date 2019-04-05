import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from "@material-ui/core";
import Chat from '../Chat';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


export default class Message extends React.Component {
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
    query MESSAGES($name: String!, $email: String! ){
      getMessage(to: $name, from: $email) {
        toMessage
        fromMessage
        }
    }
  `;

  const MESSAGE_SUBSCRIPTION = gql`
  subscription messageAdded {
    messageAdded {
      toMessage
    }
  }
`;

const name = localStorage.getItem('name');
const email = localStorage.getItem('email');
console.log('sdasd', email, name)

    return (
          <>
          <Query query={GET_MESSAGES} variables={{ name, email}}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <p>Loading......<CircularProgress size={24} thickness={4} /></p>;
            if (error) return <p>An error occurred..--- inside message query --{error.message}</p>;
            console.log('--------', data.getMessage);
            let arr = Object.values(data.getMessage);
            // Object.values(data.getMessage).find((res) => {
              // console.log('inside find########', typeof res);
              final = arr[1]
              console.log('final', final);
              // if(typeof res === 'object'){
              //   final = res
              //   console.log('!!!!', final);
              // }
            // })

            return (
              <>
              <Chat
              msgData={final} 
              {...this.props} 
              subscribeToNewComments={() =>
                subscribeToMore({
                  document: MESSAGE_SUBSCRIPTION,
                  updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.messageAdded.toMessage;
                    console.log('inside message subscribe', newMessage);
                    return  {
                      getMessage: {
                        toMessage: newMessage
                      }
                    };
                  }
                })
              }
              />
              </>
            );

          }}
          
          </Query>
          </>
    );
  }
}

Message.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
