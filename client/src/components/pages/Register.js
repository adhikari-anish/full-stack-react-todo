import React, { Component } from "react";
import { register } from "./UserFunctions";
// import {login} from ''

export class Register extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (localStorage.getItem("usertoken")) {
      window.location = "/todomain";
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(res => {
      this.props.history.push(`/login`);
    });
    // this.props.history.push("/login");
  };

  render() {
    return (
      <div className="wrapper register-box">
        <h1>Sign Up</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            value={this.state.first_name}
            onChange={this.onChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            value={this.state.last_name}
            onChange={this.onChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={this.state.email}
            onChange={this.onChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.onChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Register;
