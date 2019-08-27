import React, { Component } from "react";
import PropTypes from "prop-types";

class AddTodo extends Component {
  state = {
    title: ""
  };

  onChange = e => {
    this.setState({ title: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: "" });
  };

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add Todo..."
            value={this.state.title}
            onChange={this.onChange}
            required
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default AddTodo;
