import React, { Component } from "react";
import { login } from "./UserFunctions";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    login(user)
      .then(res => {
        localStorage.setItem("usertoken", res.data);
        this.props.history.push(`/todomain`);
      })
      .catch(err => {
        console.log("er", err);
      });
    // this.props.history.push("/todomain");
  };

  render() {
    return (
      <div className="wrapper login-box">
        <form onSubmit={this.onSubmit}>
          <h1>Please sign in</h1>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <button type="submit">Sign in</button>
        </form>
        {/* {Boolean(0) && <div>Incorrect</div>} */}
      </div>
    );
  }
}

export default Login;
