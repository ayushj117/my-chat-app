import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import DialogBox from './DialogBox';
import Message from './Message';


function Middle(props) {
  const { match } = props;

  return (
    <>
      <Switch>
      <Route exact path={`${match.path}`} {...props} component={DialogBox} />
        <Route exact path="/login/:email/:name" {...props} component={Message} />
        {/* <Route exact path={`${match.path}/:id`} component={TraineeDetail} /> */}
        {/* <Route path={`${match.path}/login/`} component={NoMatch} /> */}
      </Switch>
    </>
  );
}

Middle.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Middle;
