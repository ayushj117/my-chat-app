import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export default class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClickLogin = () => {
    const { history } = this.props;
    history.push(`/login`);
  };

  handleClickSignUp = () => {
    const { history } = this.props;
    history.push(`/signup`);
  };

  render() {
    return (
      <>
        <div>
          <h2>
            <center>Chat App</center>
          </h2>
          <div style={{ margin: 20, textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickSignUp}
            >
              SignUp
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </>
    );
  }
}

DialogBox.propTypes = {
  history: PropTypes.objectOf(PropTypes.objectOf).isRequired
};
