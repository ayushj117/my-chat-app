import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Login from '../Login';
import FriendsList from '../FriendsList/FriendsList';


export default class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openList: false,
      data: {},
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
    // history.push(`/login/${form.email}`);
    console.log('@@@', form);
  };

  render() {
    const { open, openList, data } = this.state;
    return (
          <>
            <div>
              <h2><center>Chat App</center></h2>
              <div style={{ margin: 20, textAlign: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={this.handleClickOpen}
                >
            Login
                </Button>
              </div>
              <Login
                open={open}
                {...this.props}
                onClose={this.handleClose}
                onSubmit={this.handleSubmit}
              />
              {
                (openList) ? <FriendsList result={data} /> : ''
              }
            </div>
            
            
          </>
    );
  }
}

TraineeList.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired,
};
