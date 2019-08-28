import React from "react";
import { Redirect } from "react-router";
// import { withRouter } from "react-router-dom";

const checkToken = WrappedComponent => {
  class CheckToken extends React.Component {
    render() {
      if (!localStorage.usertoken) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <Redirect to="/todomain" />;
      }
    }
  }
  return CheckToken;
};

export default checkToken;
