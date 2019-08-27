import React, { Component } from "react";
import PropTypes from "prop-types";

class TodoItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      // marginBottom: "15px",
      // borderRadius: "5px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.todo.completed ? "line-through" : "none"
    };
  };

  render() {
    const { id, title, completed } = this.props.todo;
    // console.log(this.props.todo);

    return (
      <div style={this.getStyle()} className="clearfix">
        <p>
          <input
            id="checkBox"
            type="checkbox"
            checked={completed}
            onChange={() => this.props.markComplete(id)}
          />{" "}
          {title}
          <button onClick={() => this.props.delTodo(id)} className="delete-btn">
            Delete
          </button>
          {/* <button
            id="edit-button"
            onClick={() => this.props.editTodo(id, title)}
          >
            Edit
          </button> */}
          <button
            id="edit-button"
            onClick={() => {
              this.props.setTrue();
              this.props.getId(id);
              // this.props.getTitle(id);
              this.props.getTitle(title);
            }}
          >
            Edit
          </button>
        </p>
        <span className="todo-date">{this.props.todo.created_at}</span>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
};

export default TodoItem;
