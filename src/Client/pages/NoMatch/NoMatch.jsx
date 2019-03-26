import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  div: {
    marginTop: theme.spacing.unit,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function NoMatch(props) {
  const { classes } = props;
  return (
    <>
      <div className={classes.div}>
        <Typography variant="h3" align="center" gutterBottom>
          Not Found
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Seems like the page you are looking after does not exist.
        </Typography>
      </div>
    </>
  );
}

NoMatch.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NoMatch);
