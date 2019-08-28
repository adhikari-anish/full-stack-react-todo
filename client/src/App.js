import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import TodoMain from "./components/TodoMain";
import Header from "./components/layout/Header";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Reset from "./reset.css";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }

  setUserName = username => {
    this.setState({ username });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header userName={this.state.username} />
          {/* <Route exact path="/" component={Home} /> */}
          <div className="container">
            <Route exact path="/about" component={About} />
            {/* <Route
              exact
              path="/todomain"
              component={checkLogin(TodoMain)}
              setUserName={this.setUserName}
            /> */}
            <Route
              exact
              path="/todomain"
              render={props => <TodoMain setUserName={this.setUserName} />}
            />
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
