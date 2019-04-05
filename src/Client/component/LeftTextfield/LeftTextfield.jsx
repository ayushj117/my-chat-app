import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string,
};

// default values for props:
const defaultProps = {
  value: '',
  style: {},
};

const styles = theme => ({
  text: {
    borderRadius: '20px',
    wordWrap: 'break-word',
    // margin: 10,
    padding: 10,
    border: '1px solid red',
    width: 'max-content',
    maxWidth: '30%'
  },
});

class LeftTextfield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, text } = this.props;

    return (
      <>
      <div className={classes.text}>
      {text}
      </div>
      </>
    );
  }
}

LeftTextfield.propTypes = propTypes;
LeftTextfield.defaultProps = defaultProps;

export default withStyles(styles)(LeftTextfield);