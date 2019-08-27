import React from "react";
import { Redirect } from "react-router";
// import { withRouter } from "react-router-dom";

const checkLogin = WrappedComponent => {
  class CheckLogin extends React.Component {
    render() {
      if (!localStorage.usertoken) {
        return <Redirect to="/login" />;
      } else {
        return <WrappedComponent {...this.props} />;
      }
    }
  }
  return CheckLogin;
};

export default checkLogin;
