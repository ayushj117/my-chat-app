import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import DialogBox from './DialogBox';
import Login from './Login';
import SignUp from './SignUp';
import Message from './Message';
import FriendsList from './FriendsList';
import FriendsCheckBox from './FriendsCheckBox';

function Middle(props) {
  const { match } = props;

  return (
    <>
    {
      <Switch>
      <Route exact path={`${match.path}`} {...props} component={DialogBox} />
      <Route exact path={`${match.path}login`} {...props} component={Login} />
      <Route exact path={`${match.path}signup`} {...props} component={SignUp} />
      {/* (localStorage.getItem('token')) ? (
        console.log('asdsad'); */}
        <Route exact path="/login/:email/:name" {...props} component={Message} />
        <Route exact path={`${match.path}login/:email`} {...props} component={FriendsList} />
        <Route exact path={`${match.path}login/:email/addFriends`} {...props} component={FriendsCheckBox} />
        {/* <Route path={`${match.path}/login/`} component={NoMatch} /> */}
        {/* ) :
        <Redirect to="/login" /> */}
      </Switch>
    }
    </>
  );
}

Middle.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Middle;
