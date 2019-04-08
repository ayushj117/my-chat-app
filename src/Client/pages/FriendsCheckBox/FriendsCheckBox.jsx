import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel,
  DialogTitle,
} from '@material-ui/core';
import {
  Person, Visibility, VisibilityOff, Email,
} from '@material-ui/icons';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
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

class FriendsCheckBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedItems: new Map(),
    };
  }

  handleChange = field => (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit, history } = this.props;
    let checkedFriends = [];
    const { checkedItems } = this.state;
    for (var key of checkedItems.keys()) {
      console.log(key);
      checkedFriends.push(key);
    }
    onSubmit(checkedFriends);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  render() {
    const { open, classes } = this.props;
    const friends = localStorage.getItem('friends');
    return (
      <>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Friends</DialogTitle>
          <DialogContent>
          {
            friends.map(item => (
              <>
              <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.checkedItems.get(item)}
                  onChange={this.handleChange}
                  value={item}
                  color="primary"
                />
              }
              label={item}
            />
            </>
            ))
          }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
                <Button
                  color="primary"
                  onClick={(e) => {
                    this.handleSubmit(e);
                  }}
                >
                  <b>Add</b>
                </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

FriendsCheckBox.propTypes = propTypes;
FriendsCheckBox.defaultProps = defaultProps;

export default withStyles(styles)(FriendsCheckBox);
