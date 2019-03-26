import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import DialogBox from './DialogBox';
import NoMatch from './NoMatch';
import FriendsList from './FriendsList';

function Middle(props) {
  const { match } = props;
  console.log('----9---', props, match.path)
  

  return (
    <>
      <Switch>
      <Route exact path={`${match.path}`} {...props} component={DialogBox} />
        <Route exact path="/login/:id" {...props} component={FriendsList} />
        {/* <Route exact path={`${match.path}/:id`} component={TraineeDetail} /> */}
        <Route path={`${match.path}/login/`} component={NoMatch} />
      </Switch>
    </>
  );
}

Middle.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Middle;
