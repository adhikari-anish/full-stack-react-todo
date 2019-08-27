import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

export class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }

  componentDidMount() {
    // console.log(localStorage.usertoken, "Check");
    if (localStorage.usertoken) {
      // console.log("Header will mount");
      axios
        .get("/users/profile/", {
          headers: { Authorization: localStorage.usertoken }
        })
        .then(res => this.setState({ username: res.data }));
    }
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <>
        <li>
          <Link className="link" to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link className="link" to="/register">
            Register
          </Link>
        </li>
      </>
    );

    const userLink = (
      <>
        <li>
          <Link className="link" to="/todomain">
            Todos
          </Link>
        </li>
        <li>
          <a href="" onClick={this.logOut.bind(this)} className="link">
            Logout
          </a>
        </li>
      </>
    );
    return (
      <div className="header clearfix">
        <div className="wrapper">
          <h1 id="logo">MyTodos</h1>
          <div className="header-bottom">
            <div id="username">
              {localStorage.usertoken && this.props.userName}
            </div>
            <div className="menu">
              <ul>
                <li>
                  <Link className="link" to="/">
                    Home
                  </Link>
                </li>
                {/* <li>
                  <Link className="link" to="/about">
                    About
                  </Link>
                </li> */}
                {localStorage.usertoken ? userLink : loginRegLink}
                {/* {userLink} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
